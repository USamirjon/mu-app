using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Agency.Bussiness.Services.Interfaces;
using Agency.DataAccess.CreateModels.UsersDto;
using Agency.DataAccess.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Agency.API.Controlles;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _configuration;
    
    public AuthController(IAuthService authService, IConfiguration configuration)
    {
        _authService = authService;
        _configuration = configuration;
    }

    [HttpPost("register/agent")]
    public async Task<IActionResult> RegisterAgent([FromBody] AgentDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var result = await _authService.RegisterAgentAsync(model);

        if (result.IsSuccess)
        {
            return Ok(result);
        }
        
        return BadRequest(result);
    }
    
    [HttpPost("register/client")]
    public async Task<IActionResult> RegisterClient([FromBody] ClientDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var result = await _authService.RegisterClientAsync(model);

        if (result.IsSuccess)
        {
            return Ok(result);
        }
        
        return BadRequest(result);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var user = await _authService.FindByEmailAsync(model.Email);
        
        if (user != null && await _authService.CheckPasswordAsync(user, model.Password))
        {
            var token = GenerateJwtToken(user);
            
            // Добавляем токен в куки
            Response.Cookies.Append("AuthToken", token, new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddMinutes(60) // Время жизни куки
            });
            
            return Ok(new { token });
        }
        
        return Unauthorized();
    }
    
    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "Agent") // Добавляем роли
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"]
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    
}