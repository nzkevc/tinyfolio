using api.Utils.Exceptions;

namespace api.Utils;

public class AccessTokenUtil
{
    public static void CheckAccessTokenId(Guid id, string? accessToken)
    {
        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(accessToken);
        var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub");

        if (userIdClaim == null || userIdClaim.Value != id.ToString())
        {
            throw new ForbidException("You do not have permission to update this entity.");
        }
    }
}