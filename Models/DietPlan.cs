using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessApp.Models
{
    [Table("DIET_PLANS")]
    public class DietPlan
    {
        [Key]
        [Column("DIET_ID")]
        public int DietId { get; set; }

        [Column("USER_ID")]
        public int UserId { get; set; }

        [Required]
        [Column("MEAL_TYPE")]
        [StringLength(20)]
        public string MealType { get; set; } = string.Empty; // Breakfast, Lunch, Dinner, Snack

        [Column("MEAL_DATE")]
        public DateTime MealDate { get; set; }

        [Required]
        [Column("FOOD_ITEM")]
        [StringLength(100)]
        public string FoodItem { get; set; } = string.Empty;

        [Column("QUANTITY")]
        [StringLength(50)]
        public string Quantity { get; set; } = string.Empty;

        [Column("CALORIES")]
        public decimal Calories { get; set; }

        [Column("PROTEIN_G")]
        public decimal ProteinG { get; set; }

        [Column("CARBS_G")]
        public decimal CarbsG { get; set; }

        [Column("FAT_G")]
        public decimal FatG { get; set; }

        [Column("FIBER_G")]
        public decimal FiberG { get; set; }

        [Column("SUGAR_G")]
        public decimal SugarG { get; set; }

        [Column("SODIUM_MG")]
        public decimal SodiumMg { get; set; }

        [Column("NOTES")]
        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        [Column("IS_CONSUMED")]
        public bool IsConsumed { get; set; } = false;

        [Column("CREATED_DATE")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }
}