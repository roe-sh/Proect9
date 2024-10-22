using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ProfileController(MyDbContext db)
        {
            _db = db;
        }



        [HttpGet("getAllUsers")]
        public IActionResult getAllUsers()
        {
            var users = _db.Users.ToList();

            if (users.IsNullOrEmpty()) return NotFound("there's no user in the database");

            return Ok(users);
        }


        [HttpGet("getUserById/{userId}")]
        public IActionResult getUserById(int userId) 
        {
            if (userId <= 0) return NotFound("inavlid id");

            var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return NotFound("no user was found for this id");

            return Ok(user);
        }


        //[HttpPut("editProfileInfo/{userId}")]
        //public IActionResult editProfileInfo (int userId, [FromForm] editInfoDTO info)
        //{
        //    if (userId <= 0) return NotFound("inavlid id");

        //    var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

        //    if (user == null) return NotFound("no user was found for this id");



        //}









    }
}
