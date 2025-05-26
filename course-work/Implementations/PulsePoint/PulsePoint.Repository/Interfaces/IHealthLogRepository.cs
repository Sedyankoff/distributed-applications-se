using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Interfaces;

public interface IHealthLogRepository : IBaseRepository<HealthLog>
{
    Task<IEnumerable<HealthLog>> GetLogsByUserIdAsync(Guid userId);
    Task<HealthLog> GetByDateAsync(Guid userId, DateTime date);
    Task<List<HealthLog>> GetLogsBetween(Guid userId, DateTime startDate, DateTime endDate);
    Task<decimal> GetTotalValueByGoalTypeAsync(Guid userId, string goalType, DateTime startDate, DateTime endDate);

}