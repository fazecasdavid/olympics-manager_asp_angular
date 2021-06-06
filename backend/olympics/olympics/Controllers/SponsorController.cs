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
    public class SponsorController : ControllerBase {

        private readonly OlympicsContext _context;

        public SponsorController(OlympicsContext context) {
            _context = context;
        }

        [HttpGet]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Sponsor>>> GetSponsors() {
            return await _context.Sponsors.ToListAsync();
        }

        [HttpDelete("{id}")]
        [EnableCors("Angular")]
        public async Task DeleteSponsor(int id) {
            Sponsor sponsor = await _context.Sponsors.FindAsync(id);
            if (sponsor != null) {
                // cascade the delete in the Participations table
                _context.Sponsorships.RemoveRange(_context.Sponsorships.Where(s => s.SponsorId == sponsor.Id));
                _context.Sponsors.Remove(sponsor);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPut]
        [EnableCors("Angular")]
        public async Task<ActionResult<Sponsor>> UpdateSponsor([FromBody] Sponsor sponsor) {
            //_context.Entry(athlete).State = EntityState.Modified;
            _context.Update(sponsor);
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!SponsorExists(sponsor.Id.Value)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return sponsor;
        }


        [HttpPost]
        [EnableCors("Angular")]
        public async Task<ActionResult<Sponsor>> AddSponsor([FromBody] Sponsor sponsor) {
            _context.Sponsors.Add(sponsor);
            await _context.SaveChangesAsync();
            return sponsor;
        }

        [HttpGet("{country}")]
        [Route("api/[controller]/country")]
        [EnableCors("Angular")]
        public async Task<ActionResult<List<Sponsor>>> GetSponsorsByCountry([FromQuery] String country) {
            return await _context.Sponsors.Where(a => a.Country.Contains(country)).ToListAsync();
        }

        //[HttpGet("{direction}")]
        //[Route("api/[controller]/sortByCountry")]
        //[EnableCors("Angular")]
        //public async Task<ActionResult<List<Sponsor>>> GetSponsorsSortedByCountry([FromQuery] String direction) {
        //    if (direction == "desc") {
        //        return await _context.Sponsors.OrderByDescending(a => a.Country).ToListAsync();
        //    }
        //    return await _context.Sponsors.OrderBy(a => a.Country).ToListAsync();

        //}


        private bool SponsorExists(int id) {
            return _context.Sponsors.Any(e => e.Id == id);
        }
    }
}
