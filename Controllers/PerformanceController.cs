using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FitnessApp.Models;

namespace FitnessApp.Controllers
{
    [Authorize]
    public class PerformanceController : Controller
    {
        [HttpGet]
        public IActionResult Dashboard()
        {
            var metrics = PerformanceTracker.GetMetrics(50);
            var loginMetrics = metrics.Where(m => m.Operation == "FastLogin").ToList();
            
            var viewModel = new
            {
                RecentMetrics = metrics.OrderByDescending(m => m.Timestamp).Take(20),
                LoginAverageMs = PerformanceTracker.GetAverageResponseTime("FastLogin"),
                TotalLogins = loginMetrics.Count,
                SuccessfulLogins = loginMetrics.Count(m => m.Success),
                FailedLogins = loginMetrics.Count(m => !m.Success),
                SuccessRate = loginMetrics.Count > 0 ? 
                    (double)loginMetrics.Count(m => m.Success) / loginMetrics.Count * 100 : 0
            };
            
            return View(viewModel);
        }

        [HttpPost]
        public IActionResult ClearMetrics()
        {
            PerformanceTracker.ClearMetrics();
            TempData["Message"] = "Performance metrics cleared successfully.";
            return RedirectToAction("Dashboard");
        }

        [HttpGet]
        public IActionResult Api()
        {
            var metrics = PerformanceTracker.GetMetrics(50);
            return Json(new
            {
                loginAverageMs = PerformanceTracker.GetAverageResponseTime("FastLogin"),
                recentMetrics = metrics.Select(m => new
                {
                    operation = m.Operation,
                    elapsedMs = m.ElapsedMilliseconds,
                    timestamp = m.Timestamp,
                    success = m.Success
                }).OrderByDescending(m => m.timestamp).Take(10)
            });
        }
    }
}