﻿namespace project9_cohort4.Server.DTOs
{
    public class AddAdoptionApplicationDTO
    {
        public int UserId { get; set; }
        public int AnimalId { get; set; }
        public string? UserMedicalStatus { get; set; }
        public string? UserFlatType { get; set; }
        public string? UserFinancialStatus { get; set; }
        public string? UserLivingStatus { get; set; }
        public string? UserMoreDetails { get; set; }
        public DateTime? ApplicationDate { get; set; }
    }
}