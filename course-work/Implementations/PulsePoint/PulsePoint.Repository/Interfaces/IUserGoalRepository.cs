using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Interfaces;

public interface IUserGoalRepository : IBaseRepository<UserGoal>
{
    Task<IEnumerable<Goal>> GetUserGoalsAsync(Guid userId);
    Task DeleteUserGoalAsync(UserGoal userGoal);
    Task<UserGoal> GetUserGoalAsync(Guid userId, Guid goalId);

}