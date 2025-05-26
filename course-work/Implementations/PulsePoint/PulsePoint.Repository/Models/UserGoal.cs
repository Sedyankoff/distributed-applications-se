using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Models;

public class UserGoal
{
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
    public Guid GoalId { get; set; }
    [JsonIgnore]
    public Goal Goal { get; set; }
}