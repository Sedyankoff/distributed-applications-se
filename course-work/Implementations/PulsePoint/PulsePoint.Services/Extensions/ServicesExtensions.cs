using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PulsePoint.Repository.Interfaces;
using PulsePoint.Repository.Repositories;
using PulsePoint.Repository;
using PulsePoint.Services.Implementations;
using PulsePoint.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Services.Extensions;

public static class ServicesExtensions
{
    public static IServiceCollection AddPulsePointServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IHealthLogService, HealthLogService>();
        services.AddScoped<IGoalService, GoalService>();
        services.AddScoped<IDashboardService, DashboardService>();

        return services;
    }

}
