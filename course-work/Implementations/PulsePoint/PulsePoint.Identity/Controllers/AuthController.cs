using Microsoft.AspNetCore.Mvc;
using PulsePoint.Identity.DTO;
using PulsePoint.Identity.Services;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Identity.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetUserProfile()
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User not authorized." });
            }

            var userProfile = await _authService.GetUserProfileAsync(Guid.Parse(userId));
            if (userProfile == null)
            {
                return NotFound(new { message = "User profile not found." });
            }

            return Ok(userProfile);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO request)
    {
        try
        {
            var user = new ApplicationUser
            {
                UserName = request.Username,
                Email = request.Email,
                CreatedAt = DateTime.UtcNow.AddHours(2),
                DateOfBirth = DateTime.UtcNow.AddHours(2),
            };

            var token = await _authService.RegisterAsync(user, request.Password);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO request)
    {
        var token = await _authService.LoginAsync(request.Username, request.Password);
        return Ok(new { token });
    }

    [HttpPut("update-profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDTO request)
    {
        try
        {
            var result = await _authService.UpdateUserProfileAsync(request);
            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(new { message = "Profile update failed." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

}