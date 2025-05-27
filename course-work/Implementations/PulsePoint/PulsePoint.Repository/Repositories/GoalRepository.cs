using Microsoft.EntityFrameworkCore;
using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Repositories;

public class GoalRepository : BaseRepository<Goal>, IGoalRepository
{
    public GoalRepository(PulsePointDbContext context) : base(context) { }

    public async Task<IEnumerable<Goal>> GetGoalsByUserIdAsync(Guid userId)
    {
        return await _dbSet.Where(g => g.UserGoals.Any(ug => ug.UserId == userId)).ToListAsync();
    }

    public async Task<List<Goal>> GetActiveGoalsAsync(Guid userId)
    {
        var today = DateTime.UtcNow.Date;

        return await _context.Goals
            .Where(g => g.UserGoals.Any(ug => ug.UserId == userId)
                     && g.StartDate <= today
                     && g.EndDate >= today)
            .ToListAsync();
    }

    public async Task<IEnumerable<Goal>> SearchGoalsAsync(string? goalType, DateTime? startDate)
    {
        var query = _context.Goals.AsQueryable();

        if (!string.IsNullOrWhiteSpace(goalType))
            query = query.Where(g => g.GoalType.Contains(goalType));

        if (startDate.HasValue)
            query = query.Where(g => g.StartDate.Date == startDate.Value.Date);

        return await query.ToListAsync();
    }
}