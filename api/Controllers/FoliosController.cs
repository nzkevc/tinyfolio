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
        var folio = await _folioService.GetFolioByIdAsync(id);
        if (folio == null)
        {
            return NotFound();
        }
        return folio;
    }

    // TODO: add field validation
    [HttpPost(Name = "CreateFolio")]
    public async Task<ActionResult<Folio>> CreateFolio(Folio folio)
    {
        var createdFolio = await _folioService.CreateFolioAsync(folio);
        return CreatedAtAction(nameof(GetFolioById), new { id = createdFolio.Id }, createdFolio);
    }

    // TODO: add field validation
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
}