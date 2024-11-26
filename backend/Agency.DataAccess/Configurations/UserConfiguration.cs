using Agency.DataAccess.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Agency.DataAccess.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .HasKey(u => u.Id);

        builder
            .HasOne(u => u.Client)
            .WithOne(c => c.User)
            .HasForeignKey<Client>(c => c.UserId);
        
        builder
            .HasOne(u => u.Agent)
            .WithOne(a => a.User)
            .HasForeignKey<Agent>(a => a.UserId);
    }
}