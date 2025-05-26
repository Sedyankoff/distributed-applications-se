using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Models;

public class ApplicationUser : IdentityUser<Guid>
{
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public int? Height { get; set; }
    public decimal? Weight { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<HealthLog> HealthLogs { get; set; }
    public ICollection<UserGoal> UserGoals { get; set; }
}
