using Agency.DataAccess.Configurations;
using Agency.DataAccess.Models.RealEstate;
using Agency.DataAccess.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Agency.DataAccess;

public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}
    
    public DbSet<Agent> Agents { get; set; }
    
    public DbSet<Client> Clients { get; set; }
    
    public DbSet<Admin> Admins { get; set; }
    
    public DbSet<Apartment> Apartments { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new AgentConfiguration());
        builder.ApplyConfiguration(new ClientConfiguration());
        builder.ApplyConfiguration(new ApartmentConfiguration());
        builder.ApplyConfiguration(new UserConfiguration());
        
        base.OnModelCreating(builder);
    }
}