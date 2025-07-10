using Microsoft.EntityFrameworkCore;
using api.Models;

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

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _context.Projects
            .Include(p => p.Owner)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}