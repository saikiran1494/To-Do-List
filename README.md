# Fitness & Diet Tracker

A comprehensive fitness and diet tracking application built with ASP.NET Core MVC, C#, Bootstrap, and Oracle Database using PL/SQL.

## Features

- **Secure Authentication**: Username/password login with OTP verification
- **Dashboard**: Real-time overview of daily fitness and diet activities
- **Fitness Tracking**: Monitor workouts, exercises, calories burned, and completion status
- **Diet Management**: Track meals, nutrition information, and consumption status
- **History Views**: Detailed fitness and diet history with statistical summaries
- **User Profile**: Personal information and health metrics with BMI calculation
- **Responsive Design**: Modern Bootstrap UI that works on desktop and mobile devices
- **Oracle Integration**: Full integration with Oracle Database using Entity Framework Core

## Technology Stack

- **Frontend**: ASP.NET Core MVC, Bootstrap 5, HTML5, CSS3, JavaScript
- **Backend**: C# (.NET 8), ASP.NET Core
- **Database**: Oracle Database with PL/SQL
- **ORM**: Entity Framework Core with Oracle provider
- **Authentication**: Cookie-based authentication with OTP verification
- **Development Environment**: Visual Studio Code Community

## Prerequisites

Before running this application, ensure you have:

1. **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
2. **Oracle Database** (Express Edition or higher)
3. **Oracle Developer Tools** for Visual Studio Code
4. **Visual Studio Code** with C# extension

## Database Setup

### 1. Install Oracle Database
- Download and install Oracle Database Express Edition (XE) or higher
- Note the connection details (host, port, service name, username, password)

### 2. Create Database User
```sql
-- Connect as SYSTEM or DBA
CREATE USER fitness_app IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE, CREATE SESSION, CREATE TABLE, CREATE SEQUENCE, CREATE TRIGGER, CREATE PROCEDURE, CREATE FUNCTION TO fitness_app;
ALTER USER fitness_app QUOTA UNLIMITED ON USERS;
```

### 3. Run Database Setup
```bash
# Connect to Oracle as fitness_app user
sqlplus fitness_app/your_password@localhost:1521/XE

# Run the setup script
@Database/setup.sql
```

## Installation & Setup

### 1. Clone or Download the Project
```bash
git clone <repository-url>
cd FitnessApp
```

### 2. Update Connection String
Edit `appsettings.json` and update the Oracle connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=localhost:1521/XE;User Id=fitness_app;Password=your_password;"
  }
}
```

### 3. Restore NuGet Packages
```bash
dotnet restore
```

### 4. Run Entity Framework Migrations (if needed)
```bash
dotnet ef database update
```

### 5. Build and Run the Application
```bash
dotnet build
dotnet run
```

The application will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

## Usage

### Login Process
1. Navigate to the application URL
2. Use the demo credentials:
   - **Username**: `demo_user`
   - **Password**: `demo123`
3. Enter the OTP code displayed on screen (in production, this would be sent via SMS/Email)
4. Access your personalized dashboard

### Dashboard Features
- **Statistics Cards**: View calories consumed/burned, net calories, and workout progress
- **Today's Fitness Plan**: See and mark workout completion status
- **Today's Diet Plan**: Track meal consumption by meal type
- **Quick Actions**: Navigate to history views and profile

### Navigation
- **Dashboard**: Main overview of daily activities
- **Fitness History**: Detailed workout history with filtering options
- **Diet History**: Comprehensive meal tracking with nutritional breakdown
- **Profile**: Personal information and health metrics
- **Logout**: Secure session termination

## Project Structure

```
FitnessApp/
├── Controllers/
│   ├── AuthController.cs      # Authentication and OTP verification
│   └── AccountController.cs   # Dashboard and user account management
├── Models/
│   ├── User.cs               # User entity model
│   ├── FitnessPlan.cs        # Fitness plan entity model
│   ├── DietPlan.cs           # Diet plan entity model
│   ├── OtpVerification.cs    # OTP verification entity model
│   └── ViewModels/           # View models for forms and display
├── Views/
│   ├── Auth/                 # Login and OTP verification views
│   ├── Account/              # Dashboard, profile, and history views
│   └── Shared/               # Layout and shared components
├── Data/
│   └── ApplicationDbContext.cs # Entity Framework DbContext
├── Database/
│   └── setup.sql             # Oracle database setup script
├── FitnessApp.csproj         # Project configuration
├── Program.cs                # Application startup configuration
├── appsettings.json          # Configuration settings
└── README.md                 # This file
```

## Database Schema

### Tables
- **USERS**: User account information and health metrics
- **FITNESS_PLANS**: Workout plans and exercise tracking
- **DIET_PLANS**: Meal plans and nutrition tracking
- **OTP_VERIFICATIONS**: OTP codes for authentication

### Key Features
- **Auto-incrementing IDs**: Using Oracle sequences and triggers
- **Foreign Key Constraints**: Maintaining data integrity
- **Indexes**: Optimized for common query patterns
- **PL/SQL Functions**: BMI calculation and utility functions
- **PL/SQL Procedures**: Automated cleanup tasks

## Security Features

- **Password Hashing**: SHA256 encryption for password storage
- **OTP Verification**: Two-factor authentication for enhanced security
- **Session Management**: Secure cookie-based authentication
- **SQL Injection Prevention**: Entity Framework parameterized queries
- **Input Validation**: Client-side and server-side validation

## Customization

### Adding New Features
1. Create new models in the `Models/` directory
2. Update `ApplicationDbContext.cs` to include new entities
3. Create corresponding controllers and views
4. Run migrations to update the database schema

### Styling Changes
- Modify the CSS in `Views/Shared/_Layout.cshtml`
- Bootstrap classes can be customized for different themes
- Add custom CSS files in the `wwwroot/css/` directory

### Database Modifications
- Update the database schema in `Database/setup.sql`
- Ensure Entity Framework models match the database structure
- Consider data migration strategies for existing data

## Troubleshooting

### Common Issues

1. **Oracle Connection Issues**
   - Verify Oracle service is running
   - Check connection string format
   - Ensure user has proper permissions

2. **Package Restore Failures**
   - Clear NuGet cache: `dotnet nuget locals all --clear`
   - Restore packages: `dotnet restore`

3. **Build Errors**
   - Ensure .NET 8 SDK is installed
   - Check for missing dependencies
   - Verify all files are present

4. **OTP Not Working**
   - Check session configuration in `Program.cs`
   - Verify OTP expiry settings in `appsettings.json`

### Development Tips

- Use Oracle SQL Developer for database management
- Enable detailed logging in `appsettings.json` for debugging
- Use browser developer tools to inspect client-side issues
- Monitor Oracle logs for database-related problems

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section above
- Review Oracle documentation for database issues
- Consult ASP.NET Core documentation for framework questions

---

**Note**: This is a demonstration application. For production use, implement additional security measures such as:
- Proper OTP delivery via SMS/Email services
- Enhanced password policies
- Rate limiting for login attempts
- Comprehensive error handling and logging
- SSL/TLS certificates for secure connections
