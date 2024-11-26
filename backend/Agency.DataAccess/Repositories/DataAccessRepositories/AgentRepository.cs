using Agency.DataAccess.Models.Users;
using Agency.DataAccess.Repositories.Interfaces.UsersRepository;
using Microsoft.EntityFrameworkCore;

namespace Agency.DataAccess.Repositories.DataAccessRepositories;

public class AgentRepository : IAgentRepository
{
    private readonly ApplicationDbContext _context;

    public AgentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Agent?> GetAgentByIdAsync(int id)
    {
        return await _context.Agents
            .Include(a => a.User) // Подгружаем связанные данные
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Agent?> GetAgentByUserIdAsync(int userId)
    {
        return await _context.Agents
            .Include(a => a.User)
            .FirstOrDefaultAsync(a => a.UserId == userId);
    }

    public async Task<List<Agent>> GetAllAgentsAsync()
    {
        return await _context.Agents
            .Include(a => a.User)
            .ToListAsync();
    }

    public async Task AddAgentAsync(Agent agent)
    {
        await _context.Agents.AddAsync(agent);
    }

    public async Task UpdateAgentAsync(Agent agent)
    {
        _context.Agents.Update(agent);
    }

    public async Task DeleteAgentAsync(Agent agent)
    {
        _context.Agents.Remove(agent);
    }
}
