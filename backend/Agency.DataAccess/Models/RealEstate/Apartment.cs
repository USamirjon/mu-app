using Agency.DataAccess.Models.Users;

namespace Agency.DataAccess.Models.RealEstate;

public class Apartment
{
    public int Id { get; set; }
    
    public int Price { get; set; }
    
    public int NumberOfRooms { get; set; }
    
    public string Location { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    public bool WithPets { get; set; }
    
    public bool WithKids { get; set; }
    
    public Client? Client { get; set; }
    
    public int ClientId { get; set; }

    public List<Agent> Agents { get; set; } = [];
    
    public int AgentId { get; set; }
}