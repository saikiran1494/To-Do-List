using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessApp.Models
{
    [Table("OTP_VERIFICATIONS")]
    public class OtpVerification
    {
        [Key]
        [Column("OTP_ID")]
        public int OtpId { get; set; }

        [Column("USER_ID")]
        public int UserId { get; set; }

        [Required]
        [Column("OTP_CODE")]
        [StringLength(6)]
        public string OtpCode { get; set; } = string.Empty;

        [Column("GENERATED_AT")]
        public DateTime GeneratedAt { get; set; } = DateTime.Now;

        [Column("EXPIRES_AT")]
        public DateTime ExpiresAt { get; set; }

        [Column("IS_USED")]
        public bool IsUsed { get; set; } = false;

        [Column("USED_AT")]
        public DateTime? UsedAt { get; set; }

        [Column("PURPOSE")]
        [StringLength(20)]
        public string Purpose { get; set; } = "LOGIN"; // LOGIN, PASSWORD_RESET, etc.

        // Navigation property
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }
}