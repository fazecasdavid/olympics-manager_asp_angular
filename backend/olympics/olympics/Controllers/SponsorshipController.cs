using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using olympics.Data;
using olympics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olympics.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorshipController : ControllerBase {

        private readonly OlympicsContext _context;

        public SponsorshipController(OlympicsContext context) {
            _context = context;
        }

        [HttpGet]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Sponsorship>>> GetSponsorships() {
            return await _context.Sponsorships.ToListAsync();
        }

        [HttpDelete("{id}")]
        [EnableCors("Angular")]
        public async Task DeleteSponsorship(int id) {
            Sponsorship sponsorship = await _context.Sponsorships.FindAsync(id);
            if (sponsorship != null) {
                // cascade the delete in the Participations table
                _context.Sponsorships.Remove(sponsorship);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPut]
        [EnableCors("Angular")]
        public async Task<ActionResult<Sponsorship>> UpdateSponsorship([FromBody] Sponsorship sponsorship) {
            //_context.Entry(athlete).State = EntityState.Modified;
            _context.Update(sponsorship);
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!SponsorshipExists(sponsorship.Id.Value)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return sponsorship;
        }


        [HttpPost]
        [EnableCors("Angular")]
        public async Task<ActionResult<Sponsorship>> AddSponsorship([FromBody] Sponsorship sponsorship) {
            _context.Sponsorships.Add(sponsorship);
            await _context.SaveChangesAsync();
            return sponsorship;
        }

        [HttpGet("{moneyContribution}")]
        [Route("api/[controller]/moneyContribution")]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Sponsorship>>> GetSponsorshipsByCountry([FromQuery] int moneyContribution) {
            return await _context.Sponsorships.Where(a => a.MoneyContribution >= moneyContribution).ToArrayAsync();
        }


        private bool SponsorshipExists(int id) {
            return _context.Sponsorships.Any(e => e.Id == id);
        }
    }
}
