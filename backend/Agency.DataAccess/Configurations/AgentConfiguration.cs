using Agency.DataAccess.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Agency.DataAccess.Configurations;

public class AgentConfiguration : IEntityTypeConfiguration<Agent>
{
    public void Configure(EntityTypeBuilder<Agent> builder)
    {
        builder
            .HasKey(a => a.Id);

        builder
            .HasMany(a => a.Clients)
            .WithMany(c => c.Agents);
        
        builder
            .HasMany(a => a.Apartments)
            .WithMany(a => a.Agents);
    }
}