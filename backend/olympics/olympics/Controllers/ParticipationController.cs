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
    public class ParticipationController : ControllerBase {

        private readonly OlympicsContext _context;

        public ParticipationController(OlympicsContext context) {
            _context = context;
        }

        [HttpGet]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Participation>>> GetParticipations() {
            return await _context.Participations.ToListAsync();
        }

        [HttpDelete("{id}")]
        [EnableCors("Angular")]
        public async Task DeleteParticipation(int id) {
            Participation participation = await _context.Participations.FindAsync(id);
            if (participation != null) {
                // cascade the delete in the Participations table
                _context.Participations.Remove(participation);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPut]
        [EnableCors("Angular")]
        public async Task<ActionResult<Participation>> UpdateParticipation([FromBody] Participation participation) {
            //_context.Entry(athlete).State = EntityState.Modified;
            _context.Update(participation);
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ParticipationExists(participation.Id.Value)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return participation;
        }


        [HttpPost]
        [EnableCors("Angular")]
        public async Task<ActionResult<Participation>> AddParticipation([FromBody] Participation participation) {
            _context.Participations.Add(participation);
            await _context.SaveChangesAsync();
            return participation;
        }

        [HttpGet("{rank}")]
        [Route("api/[controller]/rank")]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Participation>>> GetParticipationsByRank([FromQuery] int rank) {
            return await _context.Participations.Where(a => a.Rank <= rank).ToArrayAsync();
        }


        private bool ParticipationExists(int id) {
            return _context.Participations.Any(e => e.Id == id);
        }
    }
}
