using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class CreditCard
    {
        public int CreditCardId { get; set; }

        [Required(ErrorMessage = "Card type is required")]
        public string CardType { get; set; }  // Example: Credit, Debit, Prepaid, etc.

        [Required(ErrorMessage = "Credit limit is required")]
        [Range(500, 1000000, ErrorMessage = "Credit limit must be between 500 and 1,000,000")]
        public decimal CreditLimit { get; set; }  // Maximum credit limit for the card

        [Required(ErrorMessage = "Interest rate is required")]
        [Range(0.01, 100.00, ErrorMessage = "Interest rate must be between 0.01 and 100.00")]
        public decimal InterestRate { get; set; }  // Interest rate on outstanding balance

        [Required(ErrorMessage = "Annual fee is required")]
        [Range(0, 10000, ErrorMessage = "Annual fee must be between 0 and 10,000")]
        public decimal AnnualFee { get; set; }  // Annual fee for maintaining the credit card

        [Required(ErrorMessage = "Minimum payment percentage is required")]
        [Range(0.01, 100, ErrorMessage = "Minimum payment must be between 0.01 and 100 percent")]
        public decimal MinimumPaymentPercentage { get; set; }  // Minimum percentage of the balance to be paid monthly

        [Required(ErrorMessage = "Cash advance fee is required")]
        [Range(0, 10000, ErrorMessage = "Cash advance fee must be between 0 and 10,000")]
        public decimal CashAdvanceFee { get; set; }  // Fee for cash withdrawals using the credit card

        [Required(ErrorMessage = "Grace period is required")]
        [Range(0, 60, ErrorMessage = "Grace period must be between 0 and 60 days")]
        public int GracePeriodDays { get; set; }  // Number of days to pay the balance before interest is applied

        [Required(ErrorMessage = "Late payment fee is required")]
        [Range(0, 10000, ErrorMessage = "Late payment fee must be between 0 and 10,000")]
        public decimal LatePaymentFee { get; set; }  // Fee charged for late payments

        [Required(ErrorMessage = "Card status is required")]
        public string Status { get; set; }  // Active, Inactive, Blocked

        [Required(ErrorMessage = "Expiry date is required")]
        public DateTime ExpiryDate { get; set; }  // Card expiration date

        [Required(ErrorMessage = "Issuing bank is required")]
        public string IssuingBank { get; set; }  // Name of the bank issuing the card

        [Required(ErrorMessage = "Cardholder name is required")]
        public string CardholderName { get; set; }  // Name of the person who owns the card
    }
}
