using System;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class CreditCardApplication
    {
        public int CreditCardApplicationId { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }  // ID of the user applying for the credit card

        [Required(ErrorMessage = "Card type ID is required")]
        public int CreditCardId { get; set; }  // ID of the credit card type being applied for

        [Required(ErrorMessage = "Application date is required")]
        public DateTime ApplicationDate { get; set; }  // Date when the credit card application was submitted

        [Required(ErrorMessage = "Requested credit limit is required")]
        [Range(500, 1000000, ErrorMessage = "Credit limit must be between 500 and 1,000,000")]
        public decimal RequestedCreditLimit { get; set; }  // Requested credit limit by the applicant

        [Required]
        public string ApplicationStatus { get; set; }  // Pending, Approved, Rejected, Under Review

        [Required]
        public string EmploymentStatus { get; set; }  // Employment status of the applicant (e.g., Employed, Self-Employed, Unemployed)

        [Required(ErrorMessage = "Annual income is required")]
        public decimal AnnualIncome { get; set; }  // Annual income of the applicant

        [Required(ErrorMessage = "Remarks are required")]
        public string Remarks { get; set; }  // Any additional remarks or notes related to the application

        [Required(ErrorMessage = "Proof of identity is required")]
        public string ProofOfIdentity { get; set; }  // Proof of identity provided by the applicant

        public string? AccountHolder { get; set; }  // Name of the account holder (if required for the card disbursement)

        public string? AccountNumber { get; set; }  // Bank account number (if required for card disbursement)

        public string? IFSCCode { get; set; }  // Bank IFSC code (if required for card disbursement)

        // Navigation properties for relationships
        public User? User { get; set; }  // Reference to the user who applied
        public CreditCard? CreditCard { get; set; }  // Reference to the credit card type being applied for
    }
}
