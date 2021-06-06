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
    public class CompetitionController : ControllerBase {
        private readonly OlympicsContext _context;

        public CompetitionController(OlympicsContext context) {
            _context = context;
        }

        [HttpGet]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Competition>>> GetCompetitions() {
            return await _context.Competitions.ToListAsync();
        }

        [HttpDelete("{id}")]
        [EnableCors("Angular")]
        public async Task DeleteCompetition(int id) {
            Competition competition = await _context.Competitions.FindAsync(id);
            if (competition != null) {
                // cascade the delete in the Participations table
                _context.Participations.RemoveRange(_context.Participations.Where(p => p.CompetitionId == competition.Id));
                _context.Sponsorships.RemoveRange(_context.Sponsorships.Where(s => s.CompetitionId == competition.Id));
                _context.Competitions.Remove(competition);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPut]
        [EnableCors("Angular")]
        public async Task<ActionResult<Competition>> UpdateCompetiton([FromBody] Competition competition) {
            //_context.Entry(athlete).State = EntityState.Modified;
            _context.Update(competition);
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!CompetitionExists(competition.Id.Value)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return competition;
        }


        [HttpPost]
        [EnableCors("Angular")]
        public async Task<ActionResult<Competition>> AddCompetition([FromBody] Competition competition) {
            _context.Competitions.Add(competition);
            await _context.SaveChangesAsync();
            return competition;
        }

        [HttpGet("{location}")]
        [Route("api/[controller]/location")]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Competition>>> GetCompetitionsByLocation([FromQuery] String location) {
            return await _context.Competitions.Where(a => a.Location.Contains(location)).ToListAsync();
        }


        private bool CompetitionExists(int id) {
            return _context.Competitions.Any(e => e.Id == id);
        }



    }
}
