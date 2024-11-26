using Agency.DataAccess.Models.RealEstate;
using Agency.DataAccess.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Agency.DataAccess.Configurations;

public class ClientConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder
            .HasKey(c => c.Id);
        
        builder
            .HasMany(c => c.Agents)
            .WithMany(a => a.Clients);

        builder
            .HasOne(c => c.Apartment)
            .WithOne(a => a.Client)
            .HasForeignKey<Apartment>(a => a.ClientId);
    }
}