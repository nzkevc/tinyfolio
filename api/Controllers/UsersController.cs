using api.Models;
using api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(UserService userService, ILogger<UsersController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpGet(Name = "GetAllUsers")]
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        var users = await _userService.GetUsersAsync();
        return users;
    }

    [HttpGet("{id}", Name = "GetUserById")]
    public async Task<ActionResult<User>> GetUserById(Guid id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return user;
    }

    [HttpPut("{id}", Name = "UpdateName")]
    [Authorize]
    public async Task<IActionResult> UpdateUserName(Guid id, String name)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        user.Name = name;
        var updated = await _userService.UpdateUserAsync(user);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}", Name = "DeleteUser")]
    [Authorize]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var accessToken = Request.Cookies["ACCESS_TOKEN"];
        if (string.IsNullOrEmpty(accessToken))
        {
            return Unauthorized();
        }

        AccessTokenUtil.CheckAccessTokenId(id, accessToken);

        var deleted = await _userService.DeleteUserAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}