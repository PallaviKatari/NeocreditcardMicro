using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }
        public int? UserId { get; set; }
        public int? CreditCardId { get; set; }
        public int? CreditCardApplicationId { get; set; }
        public int? CreditCardDisbursementId { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public User? User { get; set; }
        public CreditCard? CreditCard { get; set; }
        public CreditCardApplication? CreditCardApplication { get; set; }
        public CreditCardDisbursement? CreditCardDisbursement { get; set; }
    }
}
