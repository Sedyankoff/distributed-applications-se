using Microsoft.EntityFrameworkCore;
using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Repositories;

public class HealthLogRepository : BaseRepository<HealthLog>, IHealthLogRepository
{
    public HealthLogRepository(PulsePointDbContext context) : base(context) { }

    public async Task<IEnumerable<HealthLog>> GetLogsByUserIdAsync(Guid userId)
    {
        return await _dbSet.Where(h => h.UserId == userId).ToListAsync();
    }

    public async Task<HealthLog> GetByDateAsync(Guid userId, DateTime date)
    {
        return await _context.HealthLogs
            .Where(h => h.UserId == userId && h.Date.Date == date.Date)
            .OrderByDescending(h => h.Date)
            .FirstOrDefaultAsync();
    }

    public async Task<List<HealthLog>> GetLogsBetween(Guid userId, DateTime startDate, DateTime endDate)
    {
        return await _context.HealthLogs
            .Where(h => h.UserId == userId && h.Date.Date >= startDate.Date && h.Date.Date <= endDate.Date)
            .ToListAsync();
    }

    public async Task<decimal> GetTotalValueByGoalTypeAsync(Guid userId, string goalType, DateTime startDate, DateTime endDate)
    {
        switch (goalType.ToLower())
        {
            case "steps":
                return await _context.HealthLogs
                    .Where(h => h.UserId == userId && h.Date >= startDate && h.Date <= endDate)
                    .SumAsync(h => h.StepsTaken);

            case "waterintake":
                return await _context.HealthLogs
                    .Where(h => h.UserId == userId && h.Date >= startDate && h.Date <= endDate)
                    .SumAsync(h => h.WaterIntake);

            case "sleep":
                return await _context.HealthLogs
                    .Where(h => h.UserId == userId && h.Date >= startDate && h.Date <= endDate)
                    .SumAsync(h => h.SleepHours);

            case "caloriesintake":
                return await _context.HealthLogs
                    .Where(h => h.UserId == userId && h.Date >= startDate && h.Date <= endDate)
                    .SumAsync(h => h.CaloriesIntake ?? 0);

            case "exerciseminutes":
                return await _context.HealthLogs
                    .Where(h => h.UserId == userId && h.Date >= startDate && h.Date <= endDate)
                    .SumAsync(h => h.ExerciseMinutes);

            default:
                return 0;
        }
    }
}