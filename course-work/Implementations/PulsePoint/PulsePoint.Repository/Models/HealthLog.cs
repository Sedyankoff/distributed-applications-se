using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Models;

public class HealthLog
{
    [Key]
    public Guid LogId { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Range(20, 300)]
    public decimal Weight { get; set; }

    [Range(0, 100000)]
    public int StepsTaken { get; set; }

    [Range(0, 20)]
    public decimal WaterIntake { get; set; }

    [Range(0, 24)]
    public decimal SleepHours { get; set; }

    [Range(0, 10000)]
    public int? CaloriesIntake { get; set; }

    [Range(0, 1440)]
    public int ExerciseMinutes { get; set; }

    public ApplicationUser User { get; set; }
}