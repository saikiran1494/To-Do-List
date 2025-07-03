using System.ComponentModel.DataAnnotations;

namespace FitnessApp.Models.ViewModels
{
    public class OtpViewModel
    {
        [Required(ErrorMessage = "OTP code is required")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "OTP must be 6 digits")]
        [RegularExpression(@"^\d{6}$", ErrorMessage = "OTP must be a 6-digit number")]
        [Display(Name = "OTP Code")]
        public string OtpCode { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;
        public bool RememberMe { get; set; } = false;
    }
}