namespace api.Models;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public User Owner { get; set; } = new User();
    public Guid OwnerId { get; set; } // TODO: verify if this is needed
    public List<User> Collaborators { get; set; } = new List<User>();
}
