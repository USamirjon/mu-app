using Agency.Bussiness.Services.Interfaces;
using Agency.Bussiness.Services.Logic;
using Agency.DataAccess;
using Agency.DataAccess.Repositories.DataAccessRepositories;
using Agency.DataAccess.Repositories.Interfaces.ApartamentInterface;
using Agency.DataAccess.Repositories.Interfaces.Auth;
using Agency.DataAccess.Units;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Agency.Bussiness.Extension;

public static class Extensions
{
    public static IServiceCollection AddBussiness(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        
        return services;
    }
}