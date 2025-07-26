using api.Models;
using Microsoft.EntityFrameworkCore;

public class TinyFolioDbContext : DbContext
{
    public TinyFolioDbContext(DbContextOptions<TinyFolioDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Folio> Folios { get; set; }
    public DbSet<Project> Projects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Owner)
            .WithMany()
            .HasForeignKey(p => p.OwnerId);

        modelBuilder.Entity<Project>()
            .HasMany(p => p.Collaborators)
            .WithMany();
    }
}