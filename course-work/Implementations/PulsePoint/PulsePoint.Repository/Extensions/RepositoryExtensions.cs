using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Models;
using PulsePoint.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Repository.Extensions;

public static class RepositoryExtensions
{
    public static IServiceCollection AddRepositoryServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<PulsePointDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("PulsePointDb"))
        );

        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IHealthLogRepository, HealthLogRepository>();
        services.AddScoped<IGoalRepository, GoalRepository>();
        services.AddScoped<IUserGoalRepository, UserGoalRepository>();

        return services;
    }
}