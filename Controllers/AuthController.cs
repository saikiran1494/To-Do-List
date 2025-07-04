using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using FitnessApp.Data;
using FitnessApp.Models;
using FitnessApp.Models.ViewModels;

namespace FitnessApp.Controllers
{
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == model.Username && u.IsActive);

            if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
            {
                ModelState.AddModelError("", "Invalid username or password.");
                return View(model);
            }

            // Generate OTP
            var otpCode = GenerateOTP();
            var otp = new OtpVerification
            {
                UserId = user.UserId,
                OtpCode = otpCode,
                GeneratedAt = DateTime.Now,
                ExpiresAt = DateTime.Now.AddMinutes(int.Parse(_configuration["AppSettings:OtpExpiryMinutes"] ?? "5")),
                Purpose = "LOGIN"
            };

            _context.OtpVerifications.Add(otp);
            await _context.SaveChangesAsync();

            // In a real application, send OTP via SMS/Email
            // For demo purposes, we'll show it in TempData
            TempData["OtpCode"] = otpCode;
            TempData["Message"] = $"OTP sent successfully! Demo OTP: {otpCode}";

            // Store login data in session for OTP verification
            HttpContext.Session.SetString("PendingUsername", model.Username);
            HttpContext.Session.SetString("RememberMe", model.RememberMe.ToString());

            return RedirectToAction("VerifyOtp");
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
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            TempData["Message"] = "You have been logged out successfully.";
            return RedirectToAction("Login");
        }

        private string GenerateOTP()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            // Simple password verification - in production, use proper hashing like BCrypt
            var hashedInput = ComputeHash(password);
            return hashedInput == hashedPassword;
        }

        private string ComputeHash(string input)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}