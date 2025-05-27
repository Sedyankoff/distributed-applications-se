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
    [DataType(DataType.Date)]
    public DateTime? DateOfBirth { get; set; }

    [StringLength(10, ErrorMessage = "Полът трябва да е до 10 символа.")]
    public string? Gender { get; set; }

    [Range(50, 250, ErrorMessage = "Височината трябва да е между 50 и 250 cm.")]
    public int? Height { get; set; }

    [Range(20, 300, ErrorMessage = "Теглото трябва да е между 20 и 300 kg.")]
    public decimal? Weight { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    public ICollection<HealthLog> HealthLogs { get; set; }
    public ICollection<UserGoal> UserGoals { get; set; }
}