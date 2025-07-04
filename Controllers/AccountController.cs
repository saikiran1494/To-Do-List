using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using FitnessApp.Data;
using FitnessApp.Models.ViewModels;

namespace FitnessApp.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Dashboard()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var today = DateTime.Today;

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            var todayFitnessPlans = await _context.FitnessPlans
                .Where(f => f.UserId == userId && f.PlanDate.Date == today)
                .OrderBy(f => f.CreatedDate)
                .ToListAsync();

            var todayDietPlans = await _context.DietPlans
                .Where(d => d.UserId == userId && d.MealDate.Date == today)
                .OrderBy(d => d.MealType)
                .ThenBy(d => d.CreatedDate)
                .ToListAsync();

            // Calculate statistics
            var stats = new DashboardStats
            {
                TotalCaloriesConsumed = todayDietPlans.Sum(d => d.Calories),
                TotalCaloriesBurned = todayFitnessPlans.Sum(f => f.CaloriesBurned),
                CompletedWorkouts = todayFitnessPlans.Count(f => f.IsCompleted),
                TotalWorkouts = todayFitnessPlans.Count,
                MealsConsumed = todayDietPlans.Count(d => d.IsConsumed),
                TotalMeals = todayDietPlans.Count
            };

            var viewModel = new AccountViewModel
            {
                User = user,
                TodayFitnessPlans = todayFitnessPlans,
                TodayDietPlans = todayDietPlans,
                Stats = stats
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> MarkWorkoutCompleted(int planId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var plan = await _context.FitnessPlans
                .FirstOrDefaultAsync(f => f.PlanId == planId && f.UserId == userId);

            if (plan != null)
            {
                plan.IsCompleted = !plan.IsCompleted;
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = plan.IsCompleted ? "Workout marked as completed!" : "Workout marked as pending!";
            }

            return RedirectToAction("Dashboard");
        }

        [HttpPost]
        public async Task<IActionResult> MarkMealConsumed(int dietId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var meal = await _context.DietPlans
                .FirstOrDefaultAsync(d => d.DietId == dietId && d.UserId == userId);

            if (meal != null)
            {
                meal.IsConsumed = !meal.IsConsumed;
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = meal.IsConsumed ? "Meal marked as consumed!" : "Meal marked as pending!";
            }

            return RedirectToAction("Dashboard");
        }

        public async Task<IActionResult> Profile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        public async Task<IActionResult> FitnessHistory(int days = 7)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var startDate = DateTime.Today.AddDays(-days);

            var fitnessHistory = await _context.FitnessPlans
                .Where(f => f.UserId == userId && f.PlanDate >= startDate)
                .OrderByDescending(f => f.PlanDate)
                .ThenBy(f => f.CreatedDate)
                .ToListAsync();

            ViewBag.Days = days;
            return View(fitnessHistory);
        }

        public async Task<IActionResult> DietHistory(int days = 7)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var startDate = DateTime.Today.AddDays(-days);

            var dietHistory = await _context.DietPlans
                .Where(d => d.UserId == userId && d.MealDate >= startDate)
                .OrderByDescending(d => d.MealDate)
                .ThenBy(d => d.MealType)
                .ThenBy(d => d.CreatedDate)
                .ToListAsync();

            ViewBag.Days = days;
            return View(dietHistory);
        }
    }
}