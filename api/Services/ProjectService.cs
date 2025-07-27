using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Data;

namespace Services;

public class ProjectService
{
    private readonly TinyFolioDbContext _context;

    public ProjectService(TinyFolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<Project>> GetProjectsAsync()
    {
        return await _context.Projects
            .Include(p => p.Owner)
            .ToListAsync();
    }

    public async Task<List<Project>> GetProjectsByOwnerAsync(Guid ownerId)
    {
        return await _context.Projects
            .Where(p => p.OwnerId == ownerId)
            .Include(p => p.Owner)
            .ToListAsync();
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _context.Projects
            .Include(p => p.Owner)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Project> CreateProjectAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task<bool> UpdateProjectAsync(Project project)
    {
        _context.Projects.Update(project);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteProjectAsync(int id)
    {
        var project = await GetProjectByIdAsync(id);
        if (project == null) return false;

        _context.Projects.Remove(project);
        return await _context.SaveChangesAsync() > 0;
    }
}