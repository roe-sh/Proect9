using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    /// <summary>
    /// Sends an email asynchronously.
    /// </summary>
    /// <param name="to">Recipient email address.</param>
    /// <param name="subject">Subject of the email.</param>
    /// <param name="body">Body of the email (HTML).</param>
    /// <returns>Task representing the asynchronous operation.</returns>
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        try
        {
            using (var smtpClient = new SmtpClient(_configuration["MailSettings:SmtpHost"]))
            {
                smtpClient.Port = int.Parse(_configuration["MailSettings:SmtpPort"]);
                smtpClient.Credentials = new NetworkCredential(
                    _configuration["MailSettings:SmtpUser"],
                    _configuration["MailSettings:SmtpPass"]
                );
                smtpClient.EnableSsl = true;

                using (var mailMessage = new MailMessage())
                {
                    mailMessage.From = new MailAddress(_configuration["MailSettings:FromEmail"], _configuration["MailSettings:DisplayName"]);
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = true; // Set to true if body contains HTML
                    mailMessage.To.Add(to);

                    // Send the email asynchronously
                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
        }
        catch (SmtpException smtpEx)
        {
            // Handle SMTP specific exceptions
            throw new InvalidOperationException("SMTP error occurred while sending email.", smtpEx);
        }
        catch (Exception ex)
        {
            // Handle general exceptions
            throw new InvalidOperationException("Failed to send email", ex);
        }
    }

    /// <summary>
    /// Sends an OTP email asynchronously.
    /// </summary>
    /// <param name="to">Recipient email address.</param>
    /// <param name="otp">One-Time Password to send.</param>
    /// <returns>Task representing the asynchronous operation.</returns>
    public async Task SendOtpEmailAsync(string to, string otp)
    {
        var subject = "Your OTP Code";
        var body = $"Your OTP code is: <strong>{otp}</strong>";

        // Call the general email sending method
        await SendEmailAsync(to, subject, body);
    }

    /// <summary>
    /// Sends a plain text email asynchronously.
    /// </summary>
    /// <param name="to">Recipient email address.</param>
    /// <param name="subject">Subject of the email.</param>
    /// <param name="body">Body of the email (plain text).</param>
    /// <returns>Task representing the asynchronous operation.</returns>
    public async Task SendPlainTextEmailAsync(string to, string subject, string body)
    {
        // Use SendEmailAsync but set IsBodyHtml to false
        var smtpClient = new SmtpClient(_configuration["MailSettings:SmtpHost"])
        {
            Port = int.Parse(_configuration["MailSettings:SmtpPort"]),
            Credentials = new NetworkCredential(
                _configuration["MailSettings:SmtpUser"],
                _configuration["MailSettings:SmtpPass"]
            ),
            EnableSsl = true
        };

        using (var mailMessage = new MailMessage())
        {
            mailMessage.From = new MailAddress(_configuration["MailSettings:FromEmail"], _configuration["MailSettings:DisplayName"]);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            mailMessage.IsBodyHtml = false; // Set to false for plain text
            mailMessage.To.Add(to);

            // Send the email asynchronously
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
