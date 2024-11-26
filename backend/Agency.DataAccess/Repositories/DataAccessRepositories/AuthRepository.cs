using Agency.DataAccess.CreateModels.UsersDto;
using Agency.DataAccess.Models.Users;
using Agency.DataAccess.Repositories.Interfaces.Auth;

namespace Agency.DataAccess.Repositories.DataAccessRepositories;

public class AuthRepository : IAuthRepository
{
    private readonly ApplicationDbContext _context;
    
    public AuthRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<AuthResultDto?> RegisterAgent(Agent agent)
    {
        await _context.AddAsync(agent);
        await _context.SaveChangesAsync();
        return new AuthResultDto
        {
            IsSuccess = true
        };
    }

    public async Task<AuthResultDto> RegisterClient(Client agent)
    {
        await _context.AddAsync(agent);
        await _context.SaveChangesAsync();
        return new AuthResultDto
        {
            IsSuccess = true
        };
    }
}