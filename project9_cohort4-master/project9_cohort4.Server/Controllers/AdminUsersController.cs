using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    {

        private readonly MyDbContext _db;

        public AdminUsersController(MyDbContext db)
        {
            _db = db;
        }

        [HttpPut("assignUserAsAdmin/{userId}")]
        public IActionResult assignUserAsAdmin (int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return NotFound("the user was not found");

            user.IsAdmin = true;

            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok($"user with id {userId} was assined as admin");
        }















    }
}
