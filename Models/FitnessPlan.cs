using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessApp.Models
{
    [Table("FITNESS_PLANS")]
    public class FitnessPlan
    {
        [Key]
        [Column("PLAN_ID")]
        public int PlanId { get; set; }

        [Column("USER_ID")]
        public int UserId { get; set; }

        [Required]
        [Column("PLAN_NAME")]
        [StringLength(100)]
        public string PlanName { get; set; } = string.Empty;

        [Column("PLAN_DATE")]
        public DateTime PlanDate { get; set; }

        [Column("EXERCISE_TYPE")]
        [StringLength(50)]
        public string ExerciseType { get; set; } = string.Empty;

        [Column("DURATION_MINUTES")]
        public int DurationMinutes { get; set; }

        [Column("CALORIES_BURNED")]
        public decimal CaloriesBurned { get; set; }

        [Column("SETS")]
        public int? Sets { get; set; }

        [Column("REPS")]
        public int? Reps { get; set; }

        [Column("WEIGHT_KG")]
        public decimal? WeightKg { get; set; }

        [Column("NOTES")]
        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        [Column("IS_COMPLETED")]
        public bool IsCompleted { get; set; } = false;

        [Column("CREATED_DATE")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }
}