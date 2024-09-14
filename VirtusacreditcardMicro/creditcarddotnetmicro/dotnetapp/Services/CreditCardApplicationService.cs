using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class CreditCardApplicationService
    {
        private readonly ApplicationDbContext _context;

        public CreditCardApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CreditCardApplication>> GetAllCreditCardApplications()
        {
            return await _context.CreditCardApplications
                                 .Include(c => c.CreditCard) // Include related CreditCard data if needed
                                 .Include(c => c.User)       // Include related User data if needed
                                 .ToListAsync();
        }

        public async Task<CreditCardApplication> GetCreditCardApplicationById(int creditCardApplicationId)
        {
            return await _context.CreditCardApplications.FirstOrDefaultAsync(c => c.CreditCardApplicationId == creditCardApplicationId);
        }

        public async Task<bool> AddCreditCardApplication(CreditCardApplication creditCardApplication)
        {
            _context.CreditCardApplications.Add(creditCardApplication);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CreditCardApplication>> GetCreditCardApplicationsByUserId(int userId)
        {
            return await _context.CreditCardApplications
                                 .Include(c => c.CreditCard) // Include related CreditCard data if needed
                                 .Include(c => c.User)       // Include related User data if needed
                                 .Where(c => c.UserId == userId)
                                 .ToListAsync();
        }

        public async Task<bool> UpdateCreditCardApplication(int creditCardApplicationId, CreditCardApplication creditCardApplication)
        {
            var existingCreditCardApplication = await _context.CreditCardApplications.FirstOrDefaultAsync(c => c.CreditCardApplicationId == creditCardApplicationId);
            if (existingCreditCardApplication == null)
                return false;

            _context.Entry(existingCreditCardApplication).CurrentValues.SetValues(creditCardApplication);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCreditCardApplication(int creditCardApplicationId)
        {
            var creditCardApplication = await _context.CreditCardApplications.FirstOrDefaultAsync(c => c.CreditCardApplicationId == creditCardApplicationId);
            if (creditCardApplication == null)
                return false;

            _context.CreditCardApplications.Remove(creditCardApplication);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
