using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Models;

public class Goal
{
    [Key]
    public Guid Id { get; set; }
    public string GoalType { get; set; }
    public decimal TargetValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool CompletionStatus { get; set; }
    public DateTime CreatedAt { get; set; }
    [JsonIgnore]
    public ICollection<UserGoal> UserGoals { get; set; }
}