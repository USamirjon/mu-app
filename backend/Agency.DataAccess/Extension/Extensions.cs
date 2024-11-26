using Agency.DataAccess.Repositories.DataAccessRepositories;
using Agency.DataAccess.Repositories.Interfaces.ApartamentInterface;
using Agency.DataAccess.Repositories.Interfaces.Auth;
using Agency.DataAccess.Units;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Agency.DataAccess.Extension;

public static class Extensions
{
    public static IServiceCollection AddDataAccess(this IServiceCollection services)
    {
        services.AddScoped<IAuthRepository, AuthRepository>();
        services.AddScoped<IApartmentRepository, ApartmentRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Защита от SQL инъекции "Надо сделать, но впадлу пока что"
        services.AddDbContext<ApplicationDbContext>(x =>
        {
            x.UseNpgsql("Host=localhost;Database=Agency;Username=sergey;Password=1618");
        });
        return services;
    }
}

