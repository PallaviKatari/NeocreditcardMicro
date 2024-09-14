using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/ms/creditcarddisbursements")]
    [ApiController]
    public class CreditCardDisbursementController : ControllerBase
    {
        private readonly CreditCardDisbursementService _creditCardDisbursementService;

        public CreditCardDisbursementController(CreditCardDisbursementService creditCardDisbursementService)
        {
            _creditCardDisbursementService = creditCardDisbursementService;
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreditCardDisbursement>>> GetAllCreditCardDisbursements()
        {
            var creditCardDisbursements = await _creditCardDisbursementService.GetAllCreditCardDisbursements();
            return Ok(creditCardDisbursements);
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpGet("{creditCardDisbursementId}")]
        public async Task<ActionResult<CreditCardDisbursement>> GetCreditCardDisbursementById(int creditCardDisbursementId)
        {
            var creditCardDisbursement = await _creditCardDisbursementService.GetCreditCardDisbursementById(creditCardDisbursementId);
            if (creditCardDisbursement == null)
                return NotFound(new { message = "Cannot find any credit card disbursement" });

            return Ok(creditCardDisbursement);
        }

        [Authorize(Roles = "CreditCardOfficer")]
        [HttpPost]
        public async Task<ActionResult> AddCreditCardDisbursement([FromBody] CreditCardDisbursement creditCardDisbursement)
        {
            try
            {
                var success = await _creditCardDisbursementService.AddCreditCardDisbursement(creditCardDisbursement);
                if (success)
                    return Ok(new { message = "Credit card disbursement added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add credit card disbursement" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpPut("{creditCardDisbursementId}")]
        public async Task<ActionResult> UpdateCreditCardDisbursement(int creditCardDisbursementId, [FromBody] CreditCardDisbursement creditCardDisbursement)
        {
            try
            {
                creditCardDisbursement.CreditCardDisbursementId = creditCardDisbursementId;

                var success = await _creditCardDisbursementService.UpdateCreditCardDisbursement(creditCardDisbursement);
                if (success)
                    return Ok(new { message = "Credit card disbursement updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any credit card disbursement" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "CreditCardOfficer")]
        [HttpDelete("{creditCardDisbursementId}")]
        public async Task<ActionResult> DeleteCreditCardDisbursement(int creditCardDisbursementId)
        {
            try
            {
                var success = await _creditCardDisbursementService.DeleteCreditCardDisbursement(creditCardDisbursementId);
                if (success)
                    return Ok(new { message = "Credit card disbursement deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any credit card disbursement" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
