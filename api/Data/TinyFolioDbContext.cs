using api.Models;
using Microsoft.EntityFrameworkCore;

public class TinyFolioDbContext : DbContext
{
    public TinyFolioDbContext(DbContextOptions<TinyFolioDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Folio> Folios { get; set; }
    public DbSet<Project> Projects { get; set; }
}