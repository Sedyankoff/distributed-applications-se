using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.DTO;

public class HealthLogDTO
{
    public Guid UserId { get; set; }
    public DateTime Date { get; set; }
    public decimal Weight { get; set; }
    public int StepsTaken { get; set; }
    public decimal WaterIntake { get; set; }
    public decimal SleepHours { get; set; }
    public int? CaloriesIntake { get; set; }
    public int ExerciseMinutes { get; set; }
}