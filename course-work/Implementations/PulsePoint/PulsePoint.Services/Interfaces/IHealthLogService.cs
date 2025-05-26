using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Interfaces;

public interface IHealthLogService
{
    Task<IEnumerable<HealthLog>> GetHealthLogsByUserIdAsync(Guid userId);
    Task AddHealthLogAsync(HealthLog log);
    Task UpdateHealthLogAsync(Guid logId, HealthLog log);
    Task DeleteHealthLogAsync(Guid logId);
}