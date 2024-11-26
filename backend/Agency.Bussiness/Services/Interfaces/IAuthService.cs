using Agency.DataAccess.CreateModels.UsersDto;
using Agency.DataAccess.Models.Users;

namespace Agency.Bussiness.Services.Interfaces;

public interface IAuthService
{
    Task <User?> FindByEmailAsync(string email);
    Task<bool> CheckPasswordAsync(User user, string password);
    Task<AuthResultDto> RegisterAgentAsync(AgentDto model);
    Task<AuthResultDto> RegisterClientAsync(ClientDto model);
}