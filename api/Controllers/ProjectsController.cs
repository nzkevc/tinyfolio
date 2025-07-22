using api.Models;
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
}