using Microsoft.EntityFrameworkCore;
using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Repositories;

public class UserGoalRepository : BaseRepository<UserGoal>, IUserGoalRepository
{
    private readonly PulsePointDbContext _context;

    public UserGoalRepository(PulsePointDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Goal>> GetUserGoalsAsync(Guid userId)
    {
        return await _context.UserGoals
            .Where(ug => ug.UserId == userId)
            .Select(ug => ug.Goal)
            .ToListAsync();
    }

    public async Task DeleteUserGoalAsync(UserGoal userGoal)
    {
        _context.UserGoals.Remove(userGoal);
        await _context.SaveChangesAsync();
    }

    public async Task<UserGoal> GetUserGoalAsync(Guid userId, Guid goalId)
    {
        return await _context.UserGoals
            .FirstOrDefaultAsync(ug => ug.UserId == userId && ug.GoalId == goalId);
    }

}