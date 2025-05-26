using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PulsePoint.Repository.Models;
using PulsePoint.Services.DTO;
using PulsePoint.Services.Interfaces;

namespace PulsePoint.API.Controllers;

[ApiController]
[Route("api/goals")]
[Authorize]
public class GoalsController : ControllerBase
{
    private readonly IGoalService _goalService;

    public GoalsController(IGoalService goalService)
    {
        _goalService = goalService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllGoals()
    {
        var goals = await _goalService.GetAllGoalsAsync();
        return Ok(goals);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserGoals(Guid userId)
    {
        var userGoals = await _goalService.GetUserGoalsAsync(userId);
        return Ok(userGoals);
    }

    [HttpPost]
    public async Task<IActionResult> AddGoal([FromBody] GoalDTO request)
    {
        var goal = new Goal
        {
            Id = Guid.NewGuid(),
            GoalType = request.GoalType,
            TargetValue = request.TargetValue,
            StartDate = request.StartDate.ToUniversalTime().AddHours(2),
            EndDate = request.EndDate.ToUniversalTime().AddHours(2),
            CompletionStatus = request.CompletionStatus,
            CreatedAt = DateTime.UtcNow.AddHours(2),
        };

        await _goalService.AddGoalAsync(goal, request.UserId);
        return Ok(new { message = "Goal added successfully." });
    }

    [HttpPut("{goalId}")]
    public async Task<IActionResult> UpdateGoal(Guid goalId, [FromBody] GoalDTO request)
    {
        var existingGoal = await _goalService.GetGoalByIdAsync(goalId);
        if (existingGoal == null)
        {
            return NotFound(new { message = "Goal not found." });
        }

        existingGoal.GoalType = request.GoalType;
        existingGoal.TargetValue = request.TargetValue;
        existingGoal.StartDate = request.StartDate.ToUniversalTime().AddHours(2);
        existingGoal.EndDate = request.EndDate.ToUniversalTime().AddHours(2);
        existingGoal.CompletionStatus = request.CompletionStatus;

        await _goalService.UpdateGoalAsync(existingGoal);
        return Ok(new { message = "Goal updated successfully." });
    }

    [HttpDelete("{goalId}")]
    public async Task<IActionResult> RemoveGoal(Guid goalId)
    {
        var existingGoal = await _goalService.GetGoalByIdAsync(goalId);
        if (existingGoal == null)
        {
            return NotFound(new { message = "Goal not found." });
        }

        await _goalService.DeleteGoalAsync(goalId);
        return Ok(new { message = "Goal deleted successfully." });
    }

    [HttpPost("usergoal")]
    public async Task<IActionResult> AddUserGoal([FromBody] UserGoalDTO request)
    {
        await _goalService.AddUserGoalAsync(request.UserId, request.GoalId);
        return Ok(new { message = "Goal added to user successfully." });
    }

    [HttpDelete("usergoal")]
    public async Task<IActionResult> RemoveUserGoal([FromBody] UserGoalDTO request)
    {
        await _goalService.RemoveUserGoalAsync(request.UserId, request.GoalId);
        return Ok(new { message = "Goal removed from user successfully." });
    }
}