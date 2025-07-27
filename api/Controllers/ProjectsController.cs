using api.Models;
using api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _projectService;
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(ProjectService projectService, ILogger<ProjectsController> logger)
    {
        _projectService = projectService;
        _logger = logger;
    }

    [HttpGet(Name = "GetAllProjects")]
    public async Task<IEnumerable<Project>> GetAllProjects()
    {
        var projects = await _projectService.GetProjectsAsync();
        return projects;
    }

    [HttpGet("owner/{ownerId}", Name = "GetProjectsByOwner")]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjectsByOwner(string ownerId)
    {
        if (!Guid.TryParse(ownerId, out var ownerGuid))
        {
            return BadRequest("Invalid owner ID format.");
        }
        var projects = await _projectService.GetProjectsByOwnerAsync(ownerGuid);
        return Ok(projects);
    }

    [HttpGet("{id}", Name = "GetProjectById")]
    public async Task<ActionResult<Project>> GetProjectById(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null)
        {
            return NotFound();
        }
        return project;
    }

    [HttpPost(Name = "CreateProject")]
    public async Task<ActionResult<Project>> CreateProject(Project project, [FromQuery] string ownerId)
    {
        if (!Guid.TryParse(ownerId, out var ownerGuid))
        {
            return BadRequest("Invalid owner ID format.");
        }
        project.OwnerId = ownerGuid;
        var createdProject = await _projectService.CreateProjectAsync(project);
        return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
    }

    [HttpPut("{id}", Name = "UpdateProject")]
    [Authorize]
    public async Task<IActionResult> UpdateProject(int id, Project project)
    {
        var accessToken = Request.Cookies["ACCESS_TOKEN"];
        if (string.IsNullOrEmpty(accessToken))
        {
            return Unauthorized();
        }

        AccessTokenUtil.CheckAccessTokenId(project.OwnerId, accessToken);

        var updated = await _projectService.UpdateProjectAsync(project);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}", Name = "DeleteProject")]
    [Authorize]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var accessToken = Request.Cookies["ACCESS_TOKEN"];
        if (string.IsNullOrEmpty(accessToken))
        {
            return Unauthorized();
        }

        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        AccessTokenUtil.CheckAccessTokenId(project.OwnerId, accessToken);

        var deleted = await _projectService.DeleteProjectAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}