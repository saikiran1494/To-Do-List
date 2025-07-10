using System.ComponentModel.DataAnnotations;

namespace FitnessApp.Models.ViewModels
{
    public class FastLoginViewModel
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool RememberMe { get; set; } = false;
        
        // Performance: Manual validation method instead of attributes
        public bool IsValid(out List<string> errors)
        {
            errors = new List<string>();
            
            if (string.IsNullOrWhiteSpace(Username))
                errors.Add("Username is required");
            
            if (string.IsNullOrWhiteSpace(Password))
                errors.Add("Password is required");
            
            if (Username?.Length > 50)
                errors.Add("Username too long");
                
            if (Password?.Length > 255)
                errors.Add("Password too long");
            
            return errors.Count == 0;
        }
    }
}