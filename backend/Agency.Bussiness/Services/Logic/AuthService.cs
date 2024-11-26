using Agency.Bussiness.Services.Interfaces;
using Agency.DataAccess.CreateModels.UsersDto;
using Agency.DataAccess.Models.Users;
using Agency.DataAccess.Repositories.Interfaces.Auth;
using Agency.DataAccess.Units;
using Microsoft.AspNetCore.Identity;

namespace Agency.Bussiness.Services.Logic;

internal class AuthService: IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<User> _userManager;

    public AuthService(IUnitOfWork unitOfWork, UserManager<User> userManager)
    {
        _unitOfWork = unitOfWork;
        _userManager = userManager;
    }

    public async Task<User?> FindByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }
    
    public async Task<bool> CheckPasswordAsync(User user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }
    public async Task<AuthResultDto> RegisterAgentAsync(AgentDto model)
    {
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email,
        };

        var result = await _userManager.CreateAsync(user, model.Password);  // Используйте UserManager для создания пользователя

        if (!result.Succeeded)
        {
            return new AuthResultDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description).ToList() };
        }

        var agent = new Agent
        {
            UserId = user.Id,  // Связываем User с Agent
            FirstName  = model.FirstName,
            LastName = model.LastName,
            Email = model.Email
        };
    
        await _unitOfWork.AgentRepository.AddAgentAsync(agent);
        await _unitOfWork.SaveChangesAsync();

        return new AuthResultDto { IsSuccess = true };
    }


    public async Task<AuthResultDto> RegisterClientAsync(ClientDto model)
    {
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email,
        };
        
        var result = await _userManager.CreateAsync(user, model.Password);
        
        if (!result.Succeeded)
        {
            return new AuthResultDto { IsSuccess = false, Errors = result.Errors.Select(e => e.Description).ToList() };
        }
        
        var client = new Client
        {
            UserId = user.Id,
            Email = model.Email,
            FirstName  = model.FirstName,
            LastName = model.LastName,
        };
        
        await _unitOfWork.ClientRepository.AddClientAsync(client);
        await _unitOfWork.SaveChangesAsync();

        return new AuthResultDto { IsSuccess = true };
    }
    
    
  
}