using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.Models;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Email_Helper;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptionApplicationsController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly EmailHelper _emailHelper; // Change this to EmailHelper

        public AdoptionApplicationsController(MyDbContext context, EmailHelper emailHelper)
        {
            _context = context;
            _emailHelper = emailHelper; // Assign emailHelper in constructor
        }
       

        // GET: api/AdoptionApplications
        [HttpGet]
        public IActionResult GetAdoptionApplications()
        {
            var applications = _context.AdoptionApplications.ToList();
            return Ok(applications);
        }

        // GET: api/AdoptionApplications/5
        [HttpGet("{id}")]
        public IActionResult GetAdoptionApplication(int id)
        {
            var adoptionApplication = _context.AdoptionApplications.Find(id);

            if (adoptionApplication == null)
            {
                return NotFound();
            }

            return Ok(adoptionApplication);
        }

        // PUT: api/AdoptionApplications/5
        [HttpPut("{id}")]
        public IActionResult PutAdoptionApplication(int id, [FromBody] UpdateAdoptionApplicationDTO adoptionApplicationDto)
        {
            var existingApplication = _context.AdoptionApplications.Find(id);

            if (existingApplication == null)
            {
                return NotFound();
            }

            existingApplication.UserMedicalStatus = adoptionApplicationDto.UserMedicalStatus;
            existingApplication.UserFlatType = adoptionApplicationDto.UserFlatType;
            existingApplication.UserFinaincalStatus = adoptionApplicationDto.UserFinancialStatus;
            existingApplication.UserLivingStatus = adoptionApplicationDto.UserLivingStatus;
            existingApplication.UserMoreDetails = adoptionApplicationDto.UserMoreDetails;
            existingApplication.Status = adoptionApplicationDto.Status;

            _context.AdoptionApplications.Update(existingApplication);
            _context.SaveChanges();

            return Ok(existingApplication);
        }

        // POST: api/AdoptionApplications
        [HttpPost]
        public IActionResult PostAdoptionApplication([FromBody] AddAdoptionApplicationDTO adoptionApplicationDto)
        {
            try
            {
                if (adoptionApplicationDto == null)
                {
                    return BadRequest("Empty form");
                }

                var newApplication = new AdoptionApplication
                {
                    UserId = adoptionApplicationDto.UserId,
                    AnimalId = adoptionApplicationDto.AnimalId,
                    UserMedicalStatus = adoptionApplicationDto.UserMedicalStatus,
                    UserFlatType = adoptionApplicationDto.UserFlatType,
                    UserFinaincalStatus = adoptionApplicationDto.UserFinaincalStatus,
                    UserLivingStatus = adoptionApplicationDto.UserLivingStatus,
                    UserMoreDetails = adoptionApplicationDto.UserMoreDetails,
                    ApplicationDate = adoptionApplicationDto.ApplicationDate ?? DateTime.Now,
                    Status = "Pending"
                };

                _context.AdoptionApplications.Add(newApplication);
                _context.SaveChanges();

                // Send email
                _emailHelper.SendMessage(adoptionApplicationDto.UserName, adoptionApplicationDto.UserEmail,
                    "Adoption Application Received", $"Thank you for your application for animal .");

                return CreatedAtAction(nameof(GetAdoptionApplication), new { id = newApplication.ApplicationId }, newApplication);
            }
            catch (Exception ex)
            {
                // Log exception details
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Log and return error
            }
        }

        // DELETE: api/AdoptionApplications/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAdoptionApplication(int id)
        {
            var adoptionApplication = _context.AdoptionApplications.Find(id);
            if (adoptionApplication == null)
            {
                return NotFound();
            }

            _context.AdoptionApplications.Remove(adoptionApplication);
            _context.SaveChanges();

            return NoContent();
        }

        private bool AdoptionApplicationExists(int id)
        {
            return _context.AdoptionApplications.Any(e => e.ApplicationId == id);
        }
    }
}
