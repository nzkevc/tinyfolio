using api.Services;
using api.Utils.Requests;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountsController : ControllerBase
{
    private readonly AccountService _accountService;
    private readonly ILogger<AccountsController> _logger;

    public AccountsController(AccountService accountService, ILogger<AccountsController> logger)
    {
        _accountService = accountService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        await _accountService.RegisterAsync(registerRequest);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        await _accountService.LoginAsync(loginRequest);
        return Ok();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["REFRESH_TOKEN"];
        if (string.IsNullOrEmpty(refreshToken))
        {
            return BadRequest("Refresh token is missing.");
        }

        await _accountService.RefreshTokenAsync(refreshToken);
        return Ok();
    }

    [HttpGet("validate")]
    public IActionResult ValidateAccessToken()
    {
        var accessToken = Request.Cookies["ACCESS_TOKEN"];
        if (string.IsNullOrEmpty(accessToken))
        {
            return Unauthorized("Access token is missing.");
        }

        try
        {
            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(accessToken);

            if (jwtToken.ValidTo < DateTime.UtcNow)
            {
                return Unauthorized("Access token has expired.");
            }
        }
        catch (Exception)
        {
            return Unauthorized("Invalid access token.");
        }

        return Ok("Access token is valid.");
    }
}