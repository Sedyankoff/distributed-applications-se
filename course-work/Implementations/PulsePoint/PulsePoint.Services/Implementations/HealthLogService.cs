using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Models;
using PulsePoint.Services.DTO;
using PulsePoint.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Implementations;

public class HealthLogService : IHealthLogService
{
    private readonly IHealthLogRepository _healthLogRepository;

    public HealthLogService(IHealthLogRepository healthLogRepository)
    {
        _healthLogRepository = healthLogRepository;
    }

    public async Task<IEnumerable<HealthLog>> GetHealthLogsByUserIdAsync(Guid userId)
    {
        return await _healthLogRepository.GetLogsByUserIdAsync(userId);
    }

    public async Task AddHealthLogAsync(HealthLog log)
    {
        await _healthLogRepository.AddAsync(log);
    }

    public async Task UpdateHealthLogAsync(Guid logId, HealthLog log)
    {
        var existingLog = await _healthLogRepository.GetByIdAsync(logId);
        if (existingLog == null)
            throw new Exception("Health log not found.");

        existingLog.Weight = log.Weight;
        existingLog.StepsTaken = log.StepsTaken;
        existingLog.WaterIntake = log.WaterIntake;
        existingLog.SleepHours = log.SleepHours;
        existingLog.CaloriesIntake = log.CaloriesIntake;
        existingLog.ExerciseMinutes = log.ExerciseMinutes;

        await _healthLogRepository.UpdateAsync(existingLog);
    }

    public async Task DeleteHealthLogAsync(Guid logId)
    {
        await _healthLogRepository.DeleteAsync(logId);
    }
}