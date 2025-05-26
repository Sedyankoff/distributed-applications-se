using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository;

public class PulsePointDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public PulsePointDbContext(DbContextOptions<PulsePointDbContext> options)
        : base(options) { }

    public DbSet<HealthLog> HealthLogs { get; set; }
    public DbSet<Goal> Goals { get; set; }
    public DbSet<UserGoal> UserGoals { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>().ToTable("Users");

        builder.Entity<IdentityRole<Guid>>().ToTable("Roles");
        builder.Entity<IdentityUserRole<Guid>>().ToTable("UserRoles");
        builder.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaims");
        builder.Entity<IdentityUserLogin<Guid>>().ToTable("UserLogins");
        builder.Entity<IdentityUserToken<Guid>>().ToTable("UserTokens");
        builder.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaims");

        builder.Entity<HealthLog>()
            .HasOne(h => h.User)
            .WithMany(u => u.HealthLogs)
            .HasForeignKey(h => h.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserGoal>()
            .HasKey(ug => new { ug.UserId, ug.GoalId });

        builder.Entity<UserGoal>()
            .HasOne(ug => ug.User)
            .WithMany(u => u.UserGoals)
            .HasForeignKey(ug => ug.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserGoal>()
            .HasOne(ug => ug.Goal)
            .WithMany(g => g.UserGoals)
            .HasForeignKey(ug => ug.GoalId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}