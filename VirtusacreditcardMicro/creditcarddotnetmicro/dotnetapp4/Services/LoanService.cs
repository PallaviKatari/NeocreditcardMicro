using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp4.Services
{
    public class CreditCardService
    {
        private readonly ApplicationDbContext _context;

        public CreditCardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CreditCard>> GetAllCreditCards()
        {
            return await _context.CreditCards.ToListAsync();
        }

        public async Task<CreditCard> GetCreditCardById(int creditCardId)
        {
            return await _context.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCardId);
        }

        public async Task<bool> AddCreditCard(CreditCard creditCard)
        {
            _context.CreditCards.Add(creditCard);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCreditCard(CreditCard creditCard)
        {
            var existingCreditCard = await _context.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCard.CreditCardId);
            if (existingCreditCard == null)
                return false;

            // Update the existing credit card with the new values, except for the CreditCardId
            _context.Entry(existingCreditCard).CurrentValues.SetValues(creditCard);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCreditCard(int creditCardId)
        {
            var creditCard = await _context.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCardId);
            if (creditCard == null)
                return false;

            _context.CreditCards.Remove(creditCard);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
