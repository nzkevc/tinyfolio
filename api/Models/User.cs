using Microsoft.AspNetCore.Identity;

namespace api.Models;

public class User : IdentityUser<Guid>
{
    public string Name { get; set; } = string.Empty;

    public string? RefreshToken { get; set; } = null;
    public DateTime? RefreshTokenExpiresAtUtc { get; set; } = null;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public static User Create(string email, string name)
    {
        return new User
        {
            Email = email,
            UserName = email,
            Name = name,
        };
    }
}
