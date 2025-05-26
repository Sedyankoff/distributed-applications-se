using Microsoft.AspNetCore.Mvc;
using PulsePoint.Services.Implementations;
using PulsePoint.Services.Interfaces;

namespace PulsePoint.API.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetDashboard(Guid userId)
    {
        var dashboardData = await _dashboardService.GetDashboardDataAsync(userId);
        return Ok(dashboardData);
    }
}
