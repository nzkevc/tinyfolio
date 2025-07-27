using api.Models;
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

    // TODO: add field validation
    [HttpPost(Name = "CreateProject")]
    public async Task<ActionResult<Project>> CreateProject(Project project)
    {
        var createdProject = await _projectService.CreateProjectAsync(project);
        return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
    }

    // TODO: add field validation
    [HttpPut("{id}", Name = "UpdateProject")]
    [Authorize]
    public async Task<IActionResult> UpdateProject(int id, Project project)
    {
        // TODO: check if the user is the owner of the project

        if (id != project.Id)
        {
            return BadRequest("Project ID mismatch");
        }
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
        // TODO: check if the user is the owner of the project

        var deleted = await _projectService.DeleteProjectAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}