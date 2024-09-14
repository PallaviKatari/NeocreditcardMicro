using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/ms/creditcardapplication")]
    [ApiController]
    public class CreditCardApplicationController : ControllerBase
    {
        private readonly CreditCardApplicationService _creditCardApplicationService;

        public CreditCardApplicationController(CreditCardApplicationService creditCardApplicationService)
        {
            _creditCardApplicationService = creditCardApplicationService;
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreditCardApplication>>> GetAllCreditCardApplications()
        {
            var creditCardApplications = await _creditCardApplicationService.GetAllCreditCardApplications();
            return Ok(creditCardApplications);
        }

        [Authorize(Roles = "Customer, CreditCardOfficer, BranchManager")]
        [HttpGet("{creditCardApplicationId}")]
        public async Task<ActionResult<CreditCardApplication>> GetCreditCardApplicationById(int creditCardApplicationId)
        {
            var creditCardApplication = await _creditCardApplicationService.GetCreditCardApplicationById(creditCardApplicationId);
            if (creditCardApplication == null)
                return NotFound(new { message = "Cannot find any credit card application" });

            return Ok(creditCardApplication);
        }

        [Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<ActionResult> AddCreditCardApplication([FromBody] CreditCardApplication creditCardApplication)
        {
            try
            {
                var success = await _creditCardApplicationService.AddCreditCardApplication(creditCardApplication);
                if (success)
                    return Ok(new { message = "Credit card application added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add credit card application" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Customer, CreditCardOfficer, BranchManager")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CreditCardApplication>>> GetCreditCardApplicationsByUserId(int userId)
        {
            var creditCardApplications = await _creditCardApplicationService.GetCreditCardApplicationsByUserId(userId);
            return Ok(creditCardApplications);
        }

        [Authorize]
        [HttpPut("{creditCardApplicationId}")]
        public async Task<ActionResult> UpdateCreditCardApplication(int creditCardApplicationId, [FromBody] CreditCardApplication creditCardApplication)
        {
            try
            {
                var success = await _creditCardApplicationService.UpdateCreditCardApplication(creditCardApplicationId, creditCardApplication);
                if (success)
                    return Ok(new { message = "Credit card application updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any credit card application" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Customer")]
        [HttpDelete("{creditCardApplicationId}")]
        public async Task<ActionResult> DeleteCreditCardApplication(int creditCardApplicationId)
        {
            try
            {
                var success = await _creditCardApplicationService.DeleteCreditCardApplication(creditCardApplicationId);
                if (success)
                    return Ok(new { message = "Credit card application deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any credit card application" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
