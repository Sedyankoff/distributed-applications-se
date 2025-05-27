using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Models;
using PulsePoint.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Implementations;

public class GoalService : IGoalService
{
    private readonly IGoalRepository _goalRepository;
    private readonly IUserGoalRepository _userGoalRepository;

    public GoalService(IGoalRepository goalRepository, IUserGoalRepository userGoalRepository)
    {
        _goalRepository = goalRepository;
        _userGoalRepository = userGoalRepository;
    }

    public async Task<IEnumerable<Goal>> GetAllGoalsAsync()
    {
        return await _goalRepository.GetAllAsync();
    }

    public async Task<Goal> GetGoalByIdAsync(Guid goalId)
    {
        return await _goalRepository.GetByIdAsync(goalId);
    }

    public async Task AddGoalAsync(Goal goal, Guid userId)
    {
        await _goalRepository.AddAsync(goal);
        await _userGoalRepository.AddAsync(new UserGoal { UserId = userId, GoalId = goal.Id });
    }

    public async Task UpdateGoalAsync(Goal goal)
    {
        await _goalRepository.UpdateAsync(goal);
    }

    public async Task DeleteGoalAsync(Guid goalId)
    {
        await _goalRepository.DeleteAsync(goalId);
    }

    public async Task<IEnumerable<Goal>> GetUserGoalsAsync(Guid userId)
    {
        return await _userGoalRepository.GetUserGoalsAsync(userId);
    }

    public async Task AddUserGoalAsync(Guid userId, Guid goalId)
    {
        var userGoal = new UserGoal
        {
            UserId = userId,
            GoalId = goalId
        };

        await _userGoalRepository.AddAsync(userGoal);
    }

    public async Task RemoveUserGoalAsync(Guid userId, Guid goalId)
    {
        var userGoal = await _userGoalRepository.GetUserGoalAsync(userId, goalId);

        if (userGoal != null)
        {
            await _userGoalRepository.DeleteUserGoalAsync(userGoal);
        }
        else
        {
            throw new Exception("UserGoal not found.");
        }
    }

    public async Task<IEnumerable<Goal>> SearchGoalsAsync(string? goalType, DateTime? startDate)
    {
        return await _goalRepository.SearchGoalsAsync(goalType, startDate);
    }
}