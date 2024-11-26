using Agency.DataAccess.Repositories.Interfaces.ApartamentInterface;
using Agency.DataAccess.Repositories.Interfaces.UsersRepository;

namespace Agency.DataAccess.Units;

public interface IUnitOfWork : IDisposable
{
    IApartmentRepository ApartmentRepository { get; }
    IAgentRepository AgentRepository { get; }
    IClientRepository ClientRepository { get; }

    Task<int> SaveChangesAsync();
}

