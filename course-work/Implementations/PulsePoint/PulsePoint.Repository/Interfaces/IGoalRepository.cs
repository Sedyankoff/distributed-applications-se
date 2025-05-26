using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Interfaces;

public interface IGoalRepository : IBaseRepository<Goal>
{
    Task<IEnumerable<Goal>> GetGoalsByUserIdAsync(Guid userId);
    Task<List<Goal>> GetActiveGoalsAsync(Guid userId);
}