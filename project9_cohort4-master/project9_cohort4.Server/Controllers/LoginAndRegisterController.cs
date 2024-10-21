using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAndRegisterController : ControllerBase
    {

        private readonly MyDbContext _db;

        public LoginAndRegisterController(MyDbContext db)
        {
            _db = db;
        }



        [HttpPost("register")]
        public IActionResult register ()
        {


            return Ok();
        }










    }
}
