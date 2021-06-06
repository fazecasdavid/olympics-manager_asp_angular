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
    public class AthleteController : ControllerBase {

        private readonly OlympicsContext _context;

        public AthleteController(OlympicsContext context) {
            _context = context;
        }

        [HttpGet]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Athlete>>> GetAthletes() {
            return await _context.Athletes.ToListAsync();
        }

        [HttpDelete("{id}")]
        [EnableCors("Angular")]
        public async Task DeleteAthlete(int id) {
            Athlete athlete = await _context.Athletes.FindAsync(id);
            if (athlete != null) {
                // cascade the delete in the Participations table
                _context.Participations.RemoveRange(_context.Participations.Where(p => p.AthleteId == athlete.Id));
                _context.Athletes.Remove(athlete);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPut]
        [EnableCors("Angular")]
        public async Task<ActionResult<Athlete>> UpdateAthlete([FromBody] Athlete athlete) {
            //_context.Entry(athlete).State = EntityState.Modified;
            _context.Update(athlete);
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!AthleteExists(athlete.Id.Value)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return athlete;
        }


        [HttpPost]
        [EnableCors("Angular")]
        public async Task<ActionResult<Athlete>> AddAthlete([FromBody] Athlete athlete) {
            _context.Athletes.Add(athlete);
            await _context.SaveChangesAsync();
            return athlete;
        }

        [HttpGet("{country}")]
        [Route("api/[controller]/country")]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Athlete>>> GetAthletesByCountry([FromQuery] String country) {
            return await _context.Athletes.Where(a => a.Country.Contains(country)).ToArrayAsync();
        }

        //[HttpGet("{firstName}")]
        //[Route("api/[controller]/firstName")]
        //[EnableCors("Angular")]
        //public async Task<ActionResult<IEnumerable<Athlete>>> GetAthletesByFirstName([FromQuery] String firstName) {
        //    return await _context.Athletes.Where(a => a.FirstName.Contains(firstName)).ToArrayAsync();
        //}



        private bool AthleteExists(int id) {
            return _context.Athletes.Any(e => e.Id == id);
        }

    }
}
