using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;

public class EmailService
{
    private readonly string _smtpServer = "smtp.gmail.com"; // Your SMTP server
    private readonly int _smtpPort = 587; // SMTP port
    private readonly string _smtpUser = "batoulkhazali96@gmail.com";
    private readonly string _smtpPass= "ygpv tlkb kfza jwpb"; 

    public EmailService(IConfiguration configuration) // Dependency Injection for configuration
    {
        _smtpUser = configuration["EmailSettings:SmtpUser"];
        _smtpPass = configuration["EmailSettings:SmtpPass"];
    }

    public async Task SendAdoptionEmailAsync(string userName, string userEmail, int animalId)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("PetPath", _smtpUser));
        emailMessage.To.Add(new MailboxAddress(userName, userEmail));
        emailMessage.Subject = "Adoption Application Received";
        emailMessage.Body = new TextPart("plain")
        {
            Text = $"Dear {userName},\n\nThank you for your application to adopt the animal with ID: {animalId}.\n\nBest regards,\nPetPath Team"
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_smtpUser, _smtpPass);
        await client.SendAsync(emailMessage);
        await client.DisconnectAsync(true);
    }





}

