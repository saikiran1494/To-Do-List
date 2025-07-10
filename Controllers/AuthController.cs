using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;
using System.Diagnostics;
using BCrypt.Net;
using FitnessApp.Data;
using FitnessApp.Models;
using FitnessApp.Models.ViewModels;

namespace FitnessApp.Controllers
{
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        private readonly ILogger<AuthController> _logger;
        
        // Performance: Cache settings
        private readonly MemoryCacheEntryOptions _userCacheOptions = new()
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
            SlidingExpiration = TimeSpan.FromMinutes(5),
            Priority = CacheItemPriority.High
        };

        public AuthController(ApplicationDbContext context, IConfiguration configuration, 
            IMemoryCache cache, ILogger<AuthController> logger)
        {
            _context = context;
            _configuration = configuration;
            _cache = cache;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Login()
        {
            // Redirect old login to new fast login
            return RedirectToAction("FastLogin");
        }

        [HttpGet]
        public IActionResult FastLogin()
        {
            var stopwatch = Stopwatch.StartNew();
            
            // Performance: Check if already authenticated
            if (User.Identity?.IsAuthenticated == true)
            {
                return RedirectToAction("Dashboard", "Account");
            }
            
            var model = new FastLoginViewModel();
            
            stopwatch.Stop();
            ViewBag.RenderTime = stopwatch.ElapsedMilliseconds;
            
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> FastLogin(FastLoginViewModel model)
        {
            using var performanceTracker = new PerformanceStopwatch("FastLogin", model.Username);
            var stopwatch = Stopwatch.StartNew();
            
            try
            {
                // Performance: Manual validation (faster than ModelState)
                if (!model.IsValid(out var errors))
                {
                    ViewBag.Errors = errors;
                    ViewBag.RenderTime = stopwatch.ElapsedMilliseconds;
                    return View(model);
                }

                // Performance: Try cache first for user lookup
                var cacheKey = $"user_{model.Username.ToLowerInvariant()}";
                var user = await _cache.GetOrCreateAsync(cacheKey, async entry =>
                {
                    entry.SetOptions(_userCacheOptions);
                    
                    return await _context.Users
                        .AsNoTracking()
                        .Where(u => u.Username == model.Username && u.IsActive)
                        .Select(u => new { u.UserId, u.Username, u.PasswordHash, u.Email, u.FirstName, u.LastName })
                        .FirstOrDefaultAsync();
                });

                // Performance: Fast password verification
                if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                {
                    // Performance: Remove from cache if login fails
                    _cache.Remove(cacheKey);
                    
                    ViewBag.Errors = new List<string> { "Invalid username or password." };
                    ViewBag.RenderTime = stopwatch.ElapsedMilliseconds;
                    return View(model);
                }

                // Performance: Fast claims creation
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("FullName", $"{user.FirstName} {user.LastName}")
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = model.RememberMe,
                    ExpiresUtc = model.RememberMe ? 
                        DateTimeOffset.UtcNow.AddDays(30) : 
                        DateTimeOffset.UtcNow.AddMinutes(30)
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity), 
                    authProperties);

                stopwatch.Stop();
                _logger.LogInformation("Fast login successful for user {Username} in {ElapsedMs}ms", 
                    user.Username, stopwatch.ElapsedMilliseconds);

                return RedirectToAction("Dashboard", "Account");
            }
            catch (Exception ex)
            {
                stopwatch.Stop();
                _logger.LogError(ex, "Fast login error for user {Username} after {ElapsedMs}ms", 
                    model.Username, stopwatch.ElapsedMilliseconds);
                
                ViewBag.Errors = new List<string> { "An error occurred during login. Please try again." };
                ViewBag.RenderTime = stopwatch.ElapsedMilliseconds;
                return View(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            // Redirect old login POST to new fast login
            var fastModel = new FastLoginViewModel
            {
                Username = model.Username,
                Password = model.Password,
                RememberMe = model.RememberMe
            };
            return await FastLogin(fastModel);
        }

        [HttpGet]
        public IActionResult VerifyOtp()
        {
            var username = HttpContext.Session.GetString("PendingUsername");
            if (string.IsNullOrEmpty(username))
            {
                return RedirectToAction("Login");
            }

            var model = new OtpViewModel
            {
                Username = username,
                RememberMe = bool.Parse(HttpContext.Session.GetString("RememberMe") ?? "false")
            };

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyOtp(OtpViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == model.Username && u.IsActive);

            if (user == null)
            {
                ModelState.AddModelError("", "User not found.");
                return View(model);
            }

            var otp = await _context.OtpVerifications
                .Where(o => o.UserId == user.UserId && 
                           o.OtpCode == model.OtpCode && 
                           !o.IsUsed && 
                           o.ExpiresAt > DateTime.Now &&
                           o.Purpose == "LOGIN")
                .OrderByDescending(o => o.GeneratedAt)
                .FirstOrDefaultAsync();

            if (otp == null)
            {
                ModelState.AddModelError("", "Invalid or expired OTP.");
                return View(model);
            }

            // Mark OTP as used
            otp.IsUsed = true;
            otp.UsedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            // Sign in user
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("FullName", $"{user.FirstName} {user.LastName}")
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = model.RememberMe,
                ExpiresUtc = model.RememberMe ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddMinutes(30)
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity), authProperties);

            // Clear session data
            HttpContext.Session.Remove("PendingUsername");
            HttpContext.Session.Remove("RememberMe");

            TempData["SuccessMessage"] = "Login successful!";
            return RedirectToAction("Dashboard", "Account");
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            // Performance: Clear user cache on logout
            if (User.Identity?.IsAuthenticated == true)
            {
                var username = User.Identity.Name?.ToLowerInvariant();
                if (!string.IsNullOrEmpty(username))
                {
                    _cache.Remove($"user_{username}");
                }
            }
            
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("FastLogin");
        }

        // Performance: Hash passwords with BCrypt for better security and performance
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(12));
        }
    }
}