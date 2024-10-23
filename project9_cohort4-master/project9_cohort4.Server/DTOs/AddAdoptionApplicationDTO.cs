namespace project9_cohort4.Server.DTOs
{
    public class AddAdoptionApplicationDTO
    {
        public string? UserMedicalStatus { get; set; }
        public int UserId { get; set; }
      
        public string? UserFlatType { get; set; }
        public string? UserFinaincalStatus { get; set; }
        public string? UserLivingStatus { get; set; }
        public string? UserMoreDetails { get; set; }
        public DateTime? ApplicationDate { get; set; }
    }

}
