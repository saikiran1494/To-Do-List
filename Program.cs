using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using FitnessApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Performance: Configure Kestrel for high performance
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxConcurrentConnections = 1000;
    options.Limits.MaxConcurrentUpgradedConnections = 1000;
    options.Limits.MaxRequestBodySize = 1048576; // 1MB
});

// Add services to the container with optimized configuration
builder.Services.AddControllersWithViews(options =>
{
    // Disable model validation for login (we'll handle manually for performance)
    options.ModelValidatorProviders.Clear();
}).AddJsonOptions(options =>
{
    // Optimize JSON serialization
    options.JsonSerializerOptions.WriteIndented = false;
});

// Performance: Add response compression
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "text/css", "application/javascript", "text/html" });
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

// Performance: Add memory cache
builder.Services.AddMemoryCache(options =>
{
    options.SizeLimit = 1000; // Limit cache size
});

// Add Oracle Entity Framework with performance optimizations
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseOracle(builder.Configuration.GetConnectionString("DefaultConnection"))
           .EnableSensitiveDataLogging(false)
           .EnableServiceProviderCaching();
});

// Add authentication with optimized settings
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Auth/FastLogin";
        options.LogoutPath = "/Auth/Logout";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.SlidingExpiration = true;
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
        options.Cookie.SameSite = SameSiteMode.Strict;
    });

// Optimized session configuration
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
});

var app = builder.Build();

// Configure the HTTP request pipeline for performance
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

// Performance: Enable response compression first
app.UseResponseCompression();

app.UseHttpsRedirection();

// Performance: Optimized static files with caching
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Cache static files for 1 hour
        ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=3600");
    }
});

app.UseRouting();

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

// Performance: Optimized routing
app.MapControllerRoute(
    name: "fastLogin",
    pattern: "login",
    defaults: new { controller = "Auth", action = "FastLogin" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=FastLogin}/{id?}");

app.Run();