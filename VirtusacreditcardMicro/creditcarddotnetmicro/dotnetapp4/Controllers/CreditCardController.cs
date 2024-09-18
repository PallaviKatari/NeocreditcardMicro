using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp4.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp4.Controllers
{
    [Route("api/ms/creditcards")]
    [ApiController]
    public class CreditCardController : ControllerBase
    {
        private readonly CreditCardService _creditCardService;

        public CreditCardController(CreditCardService creditCardService)
        {
            _creditCardService = creditCardService;
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager, Customer")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreditCard>>> GetAllCreditCards()
        {
            var creditCards = await _creditCardService.GetAllCreditCards();
            return Ok(creditCards);
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpGet("{creditCardId}")]
        public async Task<ActionResult<CreditCard>> GetCreditCardById(int creditCardId)
        {
            var creditCard = await _creditCardService.GetCreditCardById(creditCardId);
            if (creditCard == null)
                return NotFound(new { message = "Cannot find any credit card" });

            return Ok(creditCard);
        }

        [Authorize(Roles = "CreditCardOfficer")]
        [HttpPost]
        public async Task<ActionResult> AddCreditCard([FromBody] CreditCard creditCard)
        {
            try
            {
                var success = await _creditCardService.AddCreditCard(creditCard);
                if (success)
                    return Ok(new { message = "Credit card added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add credit card" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpPut("{creditCardId}")]
        public async Task<ActionResult> UpdateCreditCard(int creditCardId, [FromBody] CreditCard creditCard)
        {
            try
            {
                // Ensure that the CreditCardId from the URL is used and not the one from the JSON body
                creditCard.CreditCardId = creditCardId;

                var success = await _creditCardService.UpdateCreditCard(creditCard);

                if (success)
                    return Ok(new { message = "Credit card updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any credit card" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "CreditCardOfficer, BranchManager")]
        [HttpDelete("{creditCardId}")]
        public async Task<ActionResult> DeleteCreditCard(int creditCardId)
        {
            try
            {
                var success = await _creditCardService.DeleteCreditCard(creditCardId);
                if (success)
                    return Ok(new { message = "Credit card deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any credit card" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
