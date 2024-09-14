using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using CommonLibrary.Models;

namespace dotnetapp3.Services
{
    public class NotificationService
    {
        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notification>> GetAllNotifications()
        {
            return await _context.Notifications.Include(n => n.User).Include(n => n.CreditCard).Include(n => n.CreditCardApplication).Include(n => n.CreditCardDisbursement).ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetNotificationsByUserId(int userId)
        {
            return await _context.Notifications.Where(n => n.UserId == userId).ToListAsync();
        }

        public async Task<bool> AddNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteNotification(int notificationId)
        {
            try
            {
                var existingNotification = await _context.Notifications.FindAsync(notificationId);

                if (existingNotification == null)
                {
                    return false;
                }

                _context.Notifications.Remove(existingNotification);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public async Task<bool> UpdateNotification(int notificationId, bool isRead)
        {
            var existingNotification = await _context.Notifications.FindAsync(notificationId);

            if (existingNotification == null)
            {
                return false;
            }

            // Update only the IsRead property
            existingNotification.IsRead = isRead;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
