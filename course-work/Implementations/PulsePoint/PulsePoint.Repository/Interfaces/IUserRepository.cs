using PulsePoint.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Interfaces;

public interface IUserRepository : IBaseRepository<ApplicationUser>
{
    Task<ApplicationUser> GetUserByEmailAsync(string email);
}