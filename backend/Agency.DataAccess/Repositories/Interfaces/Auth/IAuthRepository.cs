using Agency.DataAccess.CreateModels.UsersDto;
using Agency.DataAccess.Models.Users;

namespace Agency.DataAccess.Repositories.Interfaces.Auth;

public interface IAuthRepository
{
    Task<AuthResultDto?> RegisterAgent(Agent agent);
    Task<AuthResultDto> RegisterClient(Client client);
    // Task<AuthResultDto> Login(LoginDto model); 
}