using PulsePoint.Repository.Interfaces;
using PulsePoint.Services.DTO;
using PulsePoint.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Implementations;

public class DashboardService : IDashboardService
{
    private readonly IHealthLogRepository _healthLogRepo;
    private readonly IGoalRepository _goalRepo;

    public DashboardService(IHealthLogRepository healthLogRepo, IGoalRepository goalRepo)
    {
        _healthLogRepo = healthLogRepo ?? throw new ArgumentNullException(nameof(healthLogRepo));
        _goalRepo = goalRepo ?? throw new ArgumentNullException(nameof(goalRepo));
    }

    public async Task<DashboardDTO> GetDashboardDataAsync(Guid userId)
    {
        var today = DateTime.UtcNow.Date;
        var todaysLog = await _healthLogRepo.GetByDateAsync(userId, today);
        var activeGoals = await _goalRepo.GetActiveGoalsAsync(userId);

        var goalStats = new List<GoalProgressDTO>();
        foreach (var goal in activeGoals)
        {
            var currentValue = await _healthLogRepo.GetTotalValueByGoalTypeAsync(userId, goal.GoalType, goal.StartDate, goal.EndDate);

            double completionPercentage = (double)(currentValue / goal.TargetValue) * 100;

            goalStats.Add(new GoalProgressDTO
            {
                GoalId = goal.Id,
                GoalName = goal.GoalType,
                TargetValue = goal.TargetValue,
                CurrentValue = currentValue,
                CompletionPercentage = completionPercentage,
                IsCompleted = completionPercentage >= 100 || goal.CompletionStatus
            });
        }

        return new DashboardDTO
        {
            TodaysHealthLog = todaysLog,
            GoalsProgress = goalStats
        };
    }
}