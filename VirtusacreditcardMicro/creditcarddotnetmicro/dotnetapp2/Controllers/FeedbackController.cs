using System;
using System.Collections.Generic;
using CommonLibrary.Models;
using dotnetapp2.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp2.Controllers
{
    [Route("api/ms/feedback")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        
       [Authorize(Roles = "CreditCardOfficer, BranchManager")]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    [Authorize]

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
       [Authorize(Roles = "Customer")]

        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                await _feedbackService.AddFeedback(feedback);
                return Ok(new { message = "Feedback added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
       [Authorize(Roles = "Customer")]

        [HttpDelete("{feedbackId}")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                var success = await _feedbackService.DeleteFeedback(feedbackId);
                if (success)
                {
                    return Ok(new { message = "Feedback deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any feedback" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
