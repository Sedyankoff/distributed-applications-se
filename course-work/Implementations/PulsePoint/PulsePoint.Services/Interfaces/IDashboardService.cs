using PulsePoint.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Interfaces;

public interface IDashboardService
{
    Task<DashboardDTO> GetDashboardDataAsync(Guid userId);
};