using Agency.DataAccess.Models.RealEstate;

namespace Agency.DataAccess.Repositories.Interfaces.ApartamentInterface;


public interface IApartmentRepository
{
    Task CreateApartmentAsync(Apartment apartment);
    
    Task<Apartment?> GetApartmentByIdAsync(int id);
    
    Task<List<Apartment>> GetAllApartmentsAsync();
    
    Task<List<Apartment>> GetApartmentsByAgentIdAsync(int agentId);
    
    Task<Apartment?> GetApartmentByClientIdAsync(int clientId);
    
    Task UpdateApartmentAsync(Apartment apartment);
    
    Task DeleteApartmentAsync(Apartment apartment);
}