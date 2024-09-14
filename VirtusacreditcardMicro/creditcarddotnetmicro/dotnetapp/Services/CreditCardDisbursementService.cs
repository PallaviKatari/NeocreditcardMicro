using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class CreditCardDisbursementService
    {
        private readonly ApplicationDbContext _context;

        public CreditCardDisbursementService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CreditCardDisbursement>> GetAllCreditCardDisbursements()
        {
            return await _context.CreditCardDisbursements
                                 .Include(cd => cd.CreditCardApplication)
                                 .ThenInclude(ca => ca.User)   // Include User details
                                 .Include(cd => cd.CreditCardApplication)
                                 .ThenInclude(ca => ca.CreditCard)  // Include CreditCard details
                                 .ToListAsync();
        }

        public async Task<CreditCardDisbursement> GetCreditCardDisbursementById(int creditCardDisbursementId)
        {
            return await _context.CreditCardDisbursements.FirstOrDefaultAsync(cd => cd.CreditCardDisbursementId == creditCardDisbursementId);
        }

        public async Task<bool> AddCreditCardDisbursement(CreditCardDisbursement creditCardDisbursement)
        {
            _context.CreditCardDisbursements.Add(creditCardDisbursement);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCreditCardDisbursement(CreditCardDisbursement creditCardDisbursement)
        {
            var existingCreditCardDisbursement = await _context.CreditCardDisbursements
                .FirstOrDefaultAsync(cd => cd.CreditCardDisbursementId == creditCardDisbursement.CreditCardDisbursementId);

            if (existingCreditCardDisbursement == null)
                return false;

            // Update the existing credit card disbursement with the new values, except for the CreditCardDisbursementId
            _context.Entry(existingCreditCardDisbursement).CurrentValues.SetValues(creditCardDisbursement);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCreditCardDisbursement(int creditCardDisbursementId)
        {
            var creditCardDisbursement = await _context.CreditCardDisbursements.FirstOrDefaultAsync(cd => cd.CreditCardDisbursementId == creditCardDisbursementId);
            if (creditCardDisbursement == null)
                return false;

            _context.CreditCardDisbursements.Remove(creditCardDisbursement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
