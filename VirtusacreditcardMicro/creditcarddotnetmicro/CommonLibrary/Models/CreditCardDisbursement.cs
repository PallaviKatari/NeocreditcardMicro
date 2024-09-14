using System;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class CreditCardDisbursement
    {
        public int CreditCardDisbursementId { get; set; }

        [Required(ErrorMessage = "Credit card application ID is required")]
        public int CreditCardApplicationId { get; set; }  // ID of the associated credit card application

        [Required(ErrorMessage = "Disbursement date is required")]
        public DateTime DisbursementDate { get; set; }  // Date on which the credit card is issued or activated

        [Required(ErrorMessage = "Credit limit is required")]
        [Range(500, 1000000, ErrorMessage = "Credit limit must be between 500 and 1,000,000")]
        public decimal CreditLimit { get; set; }  // Credit limit that is allocated to the customer

        [Required(ErrorMessage = "Disbursement method is required")]
        public string DisbursementMethod { get; set; }  // Card Issuance, Bank Transfer (for balance transfer), etc.

        [Required(ErrorMessage = "Disbursement status is required")]
        public string Status { get; set; }  // Disbursed, Pending, Failed

        public string Remarks { get; set; }  // Any additional comments or notes related to the disbursement

        // Navigation property
        public CreditCardApplication? CreditCardApplication { get; set; }  // Reference to the associated credit card application
    }
}
