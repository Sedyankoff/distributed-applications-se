using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PulsePoint.Identity.DTO;
using PulsePoint.Repository.Models;
using PulsePoint.Services.DTO;
using PulsePoint.Services.Interfaces;

namespace PulsePoint.API.Controllers;

[ApiController]
[Route("api/healthlogs")]
[Authorize]
public class HealthLogsController : ControllerBase
{
    private readonly IHealthLogService _healthLogService;

    public HealthLogsController(IHealthLogService healthLogService)
    {
        _healthLogService = healthLogService;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetHealthLogs(Guid userId)
    {
        var logs = await _healthLogService.GetHealthLogsByUserIdAsync(userId);
        return Ok(logs);
    }

    [HttpPost]
    public async Task<IActionResult> AddHealthLog([FromBody] HealthLogDTO request)
    {
        var log = new HealthLog
        {
            LogId = Guid.NewGuid(),
            UserId = request.UserId,
            Date = DateTime.UtcNow,
            Weight = request.Weight,
            StepsTaken = request.StepsTaken,
            WaterIntake = request.WaterIntake,
            SleepHours = request.SleepHours,
            CaloriesIntake = request.CaloriesIntake,
            ExerciseMinutes = request.ExerciseMinutes
        };
        await _healthLogService.AddHealthLogAsync(log);
        return Ok(new { message = "Health log added successfully." });
    }

    [HttpPut("{logId}")]
    public async Task<IActionResult> UpdateHealthLog(Guid logId, [FromBody] HealthLogDTO request)
    {
        var log = new HealthLog
        {
            LogId = Guid.NewGuid(),
            UserId = request.UserId,
            Date = DateTime.UtcNow,
            Weight = request.Weight,
            StepsTaken = request.StepsTaken,
            WaterIntake = request.WaterIntake,
            SleepHours = request.SleepHours,
            CaloriesIntake = request.CaloriesIntake,
            ExerciseMinutes = request.ExerciseMinutes
        };
        await _healthLogService.UpdateHealthLogAsync(logId, log);
        return Ok(new { message = "Health log updated successfully." });
    }

    [HttpDelete("{logId}")]
    public async Task<IActionResult> DeleteHealthLog(Guid logId)
    {
        await _healthLogService.DeleteHealthLogAsync(logId);
        return Ok(new { message = "Health log deleted successfully." });
    }
}