using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.DTO;

public class DashboardDTO
{
    public HealthLog TodaysHealthLog { get; set; }
    public List<GoalProgressDTO> GoalsProgress { get; set; }
}
