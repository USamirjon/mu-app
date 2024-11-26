using Agency.DataAccess.Models.Users;

namespace Agency.DataAccess.Repositories.Interfaces.UsersRepository;

public interface IClientRepository
{
    Task<Client?> GetClientByIdAsync(int id);
    Task<Client?> GetClientByUserIdAsync(int userId);
    Task<List<Client>> GetAllClientsAsync();
    Task AddClientAsync(Client client);
    Task UpdateClientAsync(Client client);
    Task DeleteClientAsync(Client client);
}