using PulsePoint.Identity.DTO;
using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Identity.Services;

public interface IAuthService
{
    Task<string> RegisterAsync(ApplicationUser user, string password);
    Task<string> LoginAsync(string username, string password);
    Task<ApplicationUser> UpdateUserProfileAsync(UpdateProfileDTO model);
    Task<ApplicationUser> GetUserProfileAsync(Guid userId);

}