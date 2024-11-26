using Agency.DataAccess.Models.RealEstate;

namespace Agency.DataAccess.Models.Users;

public class Agent
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public User? User { get; set; }

    public string FirstName { get; set; } = string.Empty;
    
    public string LastName { get; set; } = string.Empty;
    
    public string PhotoPath { get; set; } = string.Empty;
    
    public double Rating { get; set; }
    
    public string About { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    
    public List<Client> Clients { get; set; } = [];
    
    public List<Apartment> Apartments { get; set; } = [];
}