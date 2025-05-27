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

    [Required]
    [StringLength(100, ErrorMessage = "Типът на целта трябва да е до 100 символа.")]
    public string GoalType { get; set; }

    [Range(0.01, 10000, ErrorMessage = "Стойността трябва да е положително число.")]
    public decimal TargetValue { get; set; }

    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }

    [DataType(DataType.Date)]
    public DateTime EndDate { get; set; }

    public bool CompletionStatus { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [JsonIgnore]
    public ICollection<UserGoal> UserGoals { get; set; }
}