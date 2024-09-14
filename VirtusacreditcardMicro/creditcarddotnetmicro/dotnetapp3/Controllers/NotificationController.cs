using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CommonLibrary.Models;
using dotnetapp3.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp3.Controllers
{
    [Route("api/ms/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _notificationService;

        public NotificationController(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotifications()
        {
            try
            {
                var notifications = await _notificationService.GetAllNotifications();
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

         [Authorize]
        [HttpPut("{notificationId}")]
        public async Task<ActionResult> UpdateNotification(int notificationId, [FromBody] bool isRead)
        {
            try
            {
                var success = await _notificationService.UpdateNotification(notificationId, isRead);
                if (success)
                {
                    return Ok(new { message = "Notification updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find the notification" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotificationsByUserId(int userId)
        {
            try
            {
                var notifications = await _notificationService.GetNotificationsByUserId(userId);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddNotification([FromBody] Notification notification)
        {
            try
            {
                await _notificationService.AddNotification(notification);
                return Ok(new { message = "Notification added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete("{notificationId}")]
        public async Task<ActionResult> DeleteNotification(int notificationId)
        {
            try
            {
                var success = await _notificationService.DeleteNotification(notificationId);
                if (success)
                {
                    return Ok(new { message = "Notification deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find the notification" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
