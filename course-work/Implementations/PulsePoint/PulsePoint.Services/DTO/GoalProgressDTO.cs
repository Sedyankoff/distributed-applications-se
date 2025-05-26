using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.DTO;

public class GoalProgressDTO
{
    public Guid GoalId { get; set; }
    public string GoalName { get; set; }
    public string GoalType { get; set; }
    public decimal TargetValue { get; set; }
    public decimal CurrentValue { get; set; }
    public double CompletionPercentage { get; set; }
    public bool IsCompleted { get; set; }
}