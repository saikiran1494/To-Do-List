using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessApp.Models
{
    [Table("USERS")]
    public class User
    {
        [Key]
        [Column("USER_ID")]
        public int UserId { get; set; }

        [Required]
        [Column("USERNAME")]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Column("PASSWORD_HASH")]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Column("EMAIL")]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Column("FIRST_NAME")]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Column("LAST_NAME")]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Column("PHONE")]
        [StringLength(15)]
        public string Phone { get; set; } = string.Empty;

        [Column("DATE_OF_BIRTH")]
        public DateTime? DateOfBirth { get; set; }

        [Column("GENDER")]
        [StringLength(10)]
        public string Gender { get; set; } = string.Empty;

        [Column("HEIGHT")]
        public decimal? Height { get; set; }

        [Column("WEIGHT")]
        public decimal? Weight { get; set; }

        [Column("ACTIVITY_LEVEL")]
        [StringLength(20)]
        public string ActivityLevel { get; set; } = string.Empty;

        [Column("CREATED_DATE")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Column("IS_ACTIVE")]
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public virtual ICollection<FitnessPlan> FitnessPlans { get; set; } = new List<FitnessPlan>();
        public virtual ICollection<DietPlan> DietPlans { get; set; } = new List<DietPlan>();
        public virtual ICollection<OtpVerification> OtpVerifications { get; set; } = new List<OtpVerification>();
    }
}