using Agency.DataAccess.Models.Users;

namespace Agency.DataAccess.Repositories.Interfaces.UsersRepository;

public interface IAgentRepository
{
    Task<Agent?> GetAgentByIdAsync(int id);
    Task<Agent?> GetAgentByUserIdAsync(int userId);
    Task<List<Agent>> GetAllAgentsAsync();
    Task AddAgentAsync(Agent agent);
    Task UpdateAgentAsync(Agent agent);
    Task DeleteAgentAsync(Agent agent);
}