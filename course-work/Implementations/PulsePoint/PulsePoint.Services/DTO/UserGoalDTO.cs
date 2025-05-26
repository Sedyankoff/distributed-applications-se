using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.DTO;

public class UserGoalDTO
{
    public Guid UserId { get; set; }
    public Guid GoalId { get; set; }
}
