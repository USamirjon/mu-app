using Agency.DataAccess.Models.Users;
using Agency.DataAccess.Repositories.Interfaces.UsersRepository;
using Microsoft.EntityFrameworkCore;

namespace Agency.DataAccess.Repositories.DataAccessRepositories;

public class ClientRepository : IClientRepository
{
    private readonly ApplicationDbContext _context;

    public ClientRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Client?> GetClientByIdAsync(int id)
    {
        return await _context.Clients
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Client?> GetClientByUserIdAsync(int userId)
    {
        return await _context.Clients
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }

    public async Task<List<Client>> GetAllClientsAsync()
    {
        return await _context.Clients
            .Include(c => c.User)
            .ToListAsync();
    }

    public async Task AddClientAsync(Client client)
    {
        await _context.Clients.AddAsync(client);
    }

    public async Task UpdateClientAsync(Client client)
    {
        _context.Clients.Update(client);
    }

    public async Task DeleteClientAsync(Client client)
    {
        _context.Clients.Remove(client);
    }
}