using api.Models;
using api.Utils;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class FoliosController : ControllerBase
{
    private readonly FolioService _folioService;
    private readonly ILogger<FoliosController> _logger;

    public FoliosController(FolioService folioService, ILogger<FoliosController> logger)
    {
        _folioService = folioService;
        _logger = logger;
    }

    [HttpGet("{id}", Name = "GetFolioById")]
    public async Task<ActionResult<Folio>> GetFolioById(int id)
    {
        // TODO: fix attaching owner when getting a folio
        var folio = await _folioService.GetFolioByIdAsync(id);
        if (folio == null)
        {
            return NotFound();
        }
        return folio;
    }

    [HttpGet("owner/{ownerId}", Name = "GetFolioByOwnerId")]
    public async Task<ActionResult<Folio>> GetFolioByOwnerId(string ownerId)
    {
        if (!Guid.TryParse(ownerId, out var ownerGuid))
        {
            return BadRequest("Invalid owner ID format.");
        }
        var folio = await _folioService.GetFolioByOwnerIdAsync(ownerGuid);
        if (folio == null)
        {
            return NotFound();
        }
        return folio;
    }

    [HttpPost(Name = "CreateFolio")]
    public async Task<ActionResult<Folio>> CreateFolio(Folio folio)
    {
        var createdFolio = await _folioService.CreateFolioAsync(folio);
        return CreatedAtAction(nameof(GetFolioById), new { id = createdFolio.Id }, createdFolio);
    }

    [HttpPut("{id}", Name = "UpdateFolio")]
    public async Task<IActionResult> UpdateFolio(int id, Folio folio)
    {
        if (id != folio.Id)
        {
            return BadRequest("Folio ID mismatch");
        }
        var updated = await _folioService.UpdateFolioAsync(folio);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}", Name = "DeleteFolio")]
    public async Task<IActionResult> DeleteFolio(int id)
    {
        var accessToken = Request.Cookies["ACCESS_TOKEN"];
        if (string.IsNullOrEmpty(accessToken))
        {
            return Unauthorized();
        }

        var folio = await _folioService.GetFolioByIdAsync(id);
        if (folio == null)
        {
            return NotFound();
        }

        AccessTokenUtil.CheckAccessTokenId(folio.OwnerId, accessToken);

        var deleted = await _folioService.DeleteFolioAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPost("{folioId}/projects", Name = "AddProjectsToFolio")]
    public async Task<IActionResult> AddProjectToFolio(int folioId, [FromBody] int projectId)
    {
        var folio = await _folioService.GetFolioByIdAsync(folioId);
        if (folio == null)
        {
            return NotFound();
        }

        var success = await _folioService.AddProjectToFolioAsync(folio, projectId);
        if (!success)
        {
            return BadRequest("Failed to add project to folio.");
        }

        return NoContent();
    }
}