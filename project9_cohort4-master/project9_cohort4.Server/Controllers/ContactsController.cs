using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;
using project9_cohort4.Server.Services;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly MyDbContext _db;

        private readonly ContactsEmailService _email;

        public ContactsController(MyDbContext db, ContactsEmailService email)
        {
            _db = db;
            _email = email;
        }



        [HttpPost("sendContactMessage")]
        public IActionResult sendContactMessage([FromForm] ContactFormDto contactForm)
        {
            if (contactForm == null) return BadRequest("empty form");

            var newMessage = new Contact
            {
                SenderName = contactForm.Name,
                SenderEmail = contactForm.Email,
                Subject = contactForm.Subject,
                Message = contactForm.Message,
                AdminReply = "no reply"
            };

            _db.Contacts.Add(newMessage);
            _db.SaveChanges();

            _email.SendContactEmailAsync(contactForm.Name, contactForm.Email, contactForm.Subject, contactForm.Message);

            return Ok(new { message = "Email sent successfully" });

        }





        [HttpPost("replyToContacts/{adminId}/{contactId}")]
        public IActionResult replyToContacts(int adminId, int contactId, [FromForm] ReplyFormDto replyForm)
        {
            if (replyForm == null) return BadRequest("empty form");
            if (adminId <= 0) return BadRequest("invalid admin id");
            if (contactId <= 0) return BadRequest("invalid contact id");

            var contact = _db.Contacts.FirstOrDefault(a => a.ContactId == contactId);

            contact.AdminReply = replyForm.Message;

            _db.Contacts.Update(contact);
            _db.SaveChanges();

            var admin = _db.Users.FirstOrDefault(x => x.UserId == adminId && x.IsAdmin == true);

            var adminEmail = admin.Email;

            _email.SendReplyEmailAsync(adminEmail, contact.SenderEmail, replyForm.Subject, replyForm.Message);
            return Ok(new { message = "Reply sent successfully" });

        }



        [HttpGet("getAllContactMessages")]
        public IActionResult getAllContactMessages()
        {
            var messages = _db.Contacts.ToArray();

            if (messages.Length == 0 || messages == null) return NotFound("there's no contact");

            return Ok(messages);
        }


        [HttpGet("getContactMessageById/{contactId}")]
        public IActionResult getContactMessageById(int contactId)
        {
            if (contactId <= 0) return BadRequest("invalid id");

            var contact = _db.Contacts.FirstOrDefault(x => x.ContactId == contactId);

            if (contact == null) return NotFound("the message wasn't found");

            return Ok(contact);
        }














    }
}
