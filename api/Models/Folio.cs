namespace api.Models;

public class Folio
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<Project> Projects { get; set; } = new List<Project>();
    public User Owner { get; set; } = new User();
    public Guid OwnerId { get; set; } // TODO: verify if this is needed/correct
}
