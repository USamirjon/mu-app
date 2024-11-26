using Agency.DataAccess.Repositories.DataAccessRepositories;
using Agency.DataAccess.Repositories.Interfaces.ApartamentInterface;
using Agency.DataAccess.Repositories.Interfaces.UsersRepository;

namespace Agency.DataAccess.Units;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    // Lazy loading для репозиториев, чтобы они создавались только при первом использовании
    private IApartmentRepository? _apartmentRepository;
    private IAgentRepository? _agentRepository;
    private IClientRepository? _clientRepository;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    // Репозитории инициализируются только при первом доступе к ним
    public IApartmentRepository ApartmentRepository => 
        _apartmentRepository ??= new ApartmentRepository(_context);

    public IAgentRepository AgentRepository => 
        _agentRepository ??= new AgentRepository(_context);

    public IClientRepository ClientRepository => 
        _clientRepository ??= new ClientRepository(_context);

    // Сохранение изменений в базе данных
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    // Метод для освобождения ресурсов
    public void Dispose()
    {
        _context.Dispose();
    }
}