namespace Agency.DataAccess.CreateModels.UsersDto;

public class AuthResultDto
{
    public bool IsSuccess { get; set; }
    public string? Token { get; set; }
    public List<string> Errors { get; set; } = new List<string>();
}