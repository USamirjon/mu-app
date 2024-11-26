using Agency.DataAccess.Models.RealEstate;
using Agency.DataAccess.Repositories.Interfaces.ApartamentInterface;
using Microsoft.EntityFrameworkCore;

namespace Agency.DataAccess.Repositories.DataAccessRepositories;

public class ApartmentRepository : IApartmentRepository
{
    private readonly ApplicationDbContext _context;
    
    public ApartmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task CreateApartmentAsync(Apartment apartment)
    {
        await _context.AddAsync(apartment);
        await _context.SaveChangesAsync();
    }

    public async Task<Apartment?> GetApartmentByIdAsync(int id)
    {
        return await _context.Apartments.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Apartment>> GetAllApartmentsAsync()
    {
        return await _context.Apartments.ToListAsync();
    }

    public async Task<List<Apartment>> GetApartmentsByAgentIdAsync(int agentId)
    {
        return await _context.Apartments.Where(c => c.AgentId == agentId).ToListAsync();
    }

    public async Task<Apartment?> GetApartmentByClientIdAsync(int clientId)
    {
        return await _context.Apartments.FirstOrDefaultAsync(x => x.ClientId == clientId);
    }

    public async Task UpdateApartmentAsync(Apartment apartment)
    {
        await _context.Apartments
            .Where(a => a.Id == apartment.Id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(c => c.Price, apartment.Price)
                .SetProperty(c => c.NumberOfRooms, apartment.NumberOfRooms)
                .SetProperty(c => c.Location, apartment.Location)
                .SetProperty(c => c.Description, apartment.Description)
                .SetProperty(c => c.WithPets, apartment.WithPets)
                .SetProperty(c => c.WithKids, apartment.WithKids)
                .SetProperty(c => c.ClientId, apartment.ClientId)
                .SetProperty(c => c.AgentId, apartment.AgentId)
            );
    }

    public async Task DeleteApartmentAsync(Apartment apartment)
    {
        await _context.Apartments
            .Where(a => a.Id == apartment.Id)
            .ExecuteDeleteAsync();
    }
}