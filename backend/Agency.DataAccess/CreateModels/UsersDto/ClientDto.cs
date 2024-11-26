﻿namespace Agency.DataAccess.CreateModels.UsersDto;

public class ClientDto
{
    public string Email { get; set; } = string.Empty;
    
    public string FirstName { get; set; } = string.Empty;
    
    public string LastName { get; set; } = string.Empty;
    
    public string Password { get; set; } = string.Empty;
    
    public string PasswordConfirm { get; set; } = string.Empty;
    
}