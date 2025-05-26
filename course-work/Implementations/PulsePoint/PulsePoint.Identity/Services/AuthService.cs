using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PulsePoint.Identity.DTO;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Identity.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    public async Task<ApplicationUser> GetUserProfileAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        return user;
    }

    public async Task<string> RegisterAsync(ApplicationUser user, string password)
    {
        var existingUserByEmail = await _userManager.FindByEmailAsync(user.Email);
        if (existingUserByEmail != null)
        {
            throw new Exception("Email is already in use.");
        }

        var existingUserByUsername = await _userManager.FindByNameAsync(user.UserName);
        if (existingUserByUsername != null)
        {
            throw new Exception("Username is already taken.");
        }
        user.EmailConfirmed = true;
        var result = await _userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"User registration failed: {errors}");
        }

        return GenerateJwtToken(user);
    }

    public async Task<string> LoginAsync(string username, string password)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null || !(await _signInManager.PasswordSignInAsync(username, password, false, false)).Succeeded)
        {
            throw new Exception("Invalid login attempt");
        }
        return GenerateJwtToken(user);
    }

    public async Task<ApplicationUser> UpdateUserProfileAsync(UpdateProfileDTO model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        if (!string.IsNullOrEmpty(model.Username)) user.UserName = model.Username;
        if (model.DateOfBirth != null) user.DateOfBirth = model.DateOfBirth;
        if (!string.IsNullOrEmpty(model.Gender)) user.Gender = model.Gender;
        if (model.Height.HasValue) user.Height = model.Height;
        if (model.Weight.HasValue) user.Weight = model.Weight;

        if (!string.IsNullOrEmpty(model.Password))
        {
            var removePasswordResult = await _userManager.RemovePasswordAsync(user);
            if (!removePasswordResult.Succeeded)
            {
                throw new Exception("Failed to remove old password.");
            }

            var addPasswordResult = await _userManager.AddPasswordAsync(user, model.Password);
            if (!addPasswordResult.Succeeded)
            {
                throw new Exception("Failed to set new password.");
            }
        }

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            throw new Exception("Profile update failed.");
        }

        return user;
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var claims = new[]
        {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:TokenExpiryInMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}