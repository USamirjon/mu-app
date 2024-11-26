using Agency.DataAccess.Models.RealEstate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Agency.DataAccess.Configurations;

public class ApartmentConfiguration : IEntityTypeConfiguration<Apartment>
{
    public void Configure(EntityTypeBuilder<Apartment> builder)
    {
        builder
            .HasKey(a => a.Id);

        builder
            .HasOne(a => a.Client)
            .WithOne(c => c.Apartment);

        builder
            .HasMany(a => a.Agents)
            .WithMany(a => a.Apartments);
    }
}