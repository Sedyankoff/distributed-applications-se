using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.DTO;

public class GoalDTO
{
    public Guid UserId { get; set; }
    public string GoalType { get; set; }
    public decimal TargetValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool CompletionStatus { get; set; }
    public DateTime CreatedAt { get; set; }
}
