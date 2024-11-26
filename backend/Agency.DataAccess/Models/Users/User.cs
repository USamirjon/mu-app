    using Microsoft.AspNetCore.Identity;

    namespace Agency.DataAccess.Models.Users;

    public class User : IdentityUser<int>
    {
        public double Rating { get; set; }
        
        // Внешний ключ для агента
        public int? AgentId { get; set; }
        public Agent? Agent { get; set; }

        // Внешний ключ для клиента
        public int? ClientId { get; set; }
        public Client? Client { get; set; }
    }