namespace FitnessApp.Models.ViewModels
{
    public class AccountViewModel
    {
        public User User { get; set; } = new User();
        public List<FitnessPlan> TodayFitnessPlans { get; set; } = new List<FitnessPlan>();
        public List<DietPlan> TodayDietPlans { get; set; } = new List<DietPlan>();
        public DashboardStats Stats { get; set; } = new DashboardStats();
    }

    public class DashboardStats
    {
        public decimal TotalCaloriesConsumed { get; set; }
        public decimal TotalCaloriesBurned { get; set; }
        public decimal NetCalories => TotalCaloriesConsumed - TotalCaloriesBurned;
        public int CompletedWorkouts { get; set; }
        public int TotalWorkouts { get; set; }
        public decimal WorkoutCompletionRate => TotalWorkouts > 0 ? (decimal)CompletedWorkouts / TotalWorkouts * 100 : 0;
        public int MealsConsumed { get; set; }
        public int TotalMeals { get; set; }
        public decimal MealCompletionRate => TotalMeals > 0 ? (decimal)MealsConsumed / TotalMeals * 100 : 0;
    }
}