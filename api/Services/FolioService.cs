using Microsoft.EntityFrameworkCore;
using api.Models;

namespace Services;

public class FolioService
{
    private readonly TinyFolioDbContext _context;

    public FolioService(TinyFolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<Folio>> GetFoliosAsync()
    {
        return await _context.Folios
            .Include(f => f.Projects)
            .Include(f => f.Owner)
            .ToListAsync();
    }

    public async Task<Folio?> GetFolioByIdAsync(int id)
    {
        return await _context.Folios
            .Include(f => f.Projects)
            .Include(f => f.Owner)
            .FirstOrDefaultAsync(f => f.Id == id);
    }

    public async Task<Folio> CreateFolioAsync(Folio folio)
    {
        _context.Folios.Add(folio);
        await _context.SaveChangesAsync();
        return folio;
    }

    public async Task<bool> UpdateFolioAsync(Folio folio)
    {
        _context.Folios.Update(folio);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteFolioAsync(int id)
    {
        var folio = await GetFolioByIdAsync(id);
        if (folio == null) return false;

        _context.Folios.Remove(folio);
        return await _context.SaveChangesAsync() > 0;
    }
}