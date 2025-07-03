using Microsoft.EntityFrameworkCore;
using FitnessApp.Models;

namespace FitnessApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<FitnessPlan> FitnessPlans { get; set; }
        public DbSet<DietPlan> DietPlans { get; set; }
        public DbSet<OtpVerification> OtpVerifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                
                entity.Property(e => e.Height).HasPrecision(5, 2);
                entity.Property(e => e.Weight).HasPrecision(5, 2);
            });

            // Configure FitnessPlan entity
            modelBuilder.Entity<FitnessPlan>(entity =>
            {
                entity.HasKey(e => e.PlanId);
                entity.Property(e => e.CaloriesBurned).HasPrecision(8, 2);
                entity.Property(e => e.WeightKg).HasPrecision(5, 2);
                
                entity.HasOne(d => d.User)
                    .WithMany(p => p.FitnessPlans)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure DietPlan entity
            modelBuilder.Entity<DietPlan>(entity =>
            {
                entity.HasKey(e => e.DietId);
                entity.Property(e => e.Calories).HasPrecision(8, 2);
                entity.Property(e => e.ProteinG).HasPrecision(6, 2);
                entity.Property(e => e.CarbsG).HasPrecision(6, 2);
                entity.Property(e => e.FatG).HasPrecision(6, 2);
                entity.Property(e => e.FiberG).HasPrecision(6, 2);
                entity.Property(e => e.SugarG).HasPrecision(6, 2);
                entity.Property(e => e.SodiumMg).HasPrecision(8, 2);
                
                entity.HasOne(d => d.User)
                    .WithMany(p => p.DietPlans)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure OtpVerification entity
            modelBuilder.Entity<OtpVerification>(entity =>
            {
                entity.HasKey(e => e.OtpId);
                
                entity.HasOne(d => d.User)
                    .WithMany(p => p.OtpVerifications)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}