using Agency.DataAccess.Models.RealEstate;

namespace Agency.DataAccess.Models.Users;

public class Client
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public User? User { get; set; }
    
    public string FirstName { get; set; } = string.Empty;
    
    public string LastName { get; set; } = string.Empty;
    
    public string PhotoPath { get; set; } = string.Empty;
    
    public string About { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    
    public List<Agent> Agents { get; set; } = [];
    
    public Apartment? Apartment { get; set; }
}