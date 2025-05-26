using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Interfaces;

public interface IGoalService
{
    Task<IEnumerable<Goal>> GetAllGoalsAsync();
    Task<Goal> GetGoalByIdAsync(Guid goalId);
    Task AddGoalAsync(Goal goal, Guid userId);
    Task UpdateGoalAsync(Goal goal);
    Task DeleteGoalAsync(Guid goalId);
    Task<IEnumerable<Goal>> GetUserGoalsAsync(Guid userId);
    Task AddUserGoalAsync(Guid userId, Guid goalId);
    Task RemoveUserGoalAsync(Guid userId, Guid goalId);
}