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
    public class JurorController : ControllerBase {
        private readonly OlympicsContext _context;

        public JurorController(OlympicsContext context) {
            _context = context;
        }

        [HttpGet]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Juror>>> GetJurors() {
            return await _context.Jurors.ToListAsync();
        }

        [HttpDelete("{id}")]
        [EnableCors("Angular")]
        public async Task DeleteJuror(int id) {
            Juror juror = await _context.Jurors.FindAsync(id);
            if (juror != null) {
                // cascade the delete in the Participations table
                _context.Jurors.Remove(juror);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPut]
        [EnableCors("Angular")]
        public async Task<ActionResult<Juror>> UpdateJuror([FromBody] Juror juror) {
            //_context.Entry(athlete).State = EntityState.Modified;
            _context.Update(juror);
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!JurorExists(juror.Id.Value)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return juror;
        }


        [HttpPost]
        [EnableCors("Angular")]
        public async Task<ActionResult<Juror>> AddJuror([FromBody] Juror juror) {
            _context.Jurors.Add(juror);
            await _context.SaveChangesAsync();
            return juror;
        }

        [HttpGet("{country}")]
        [Route("api/[controller]/country")]
        [EnableCors("Angular")]
        public async Task<ActionResult<IEnumerable<Juror>>> GetJurorsByCountry(String country) {
            return await _context.Jurors.Where(a => a.Country.Contains(country)).ToArrayAsync();
        }

        //[HttpGet("{firstName}")]
        //[Route("api/Juror/firstName")]
        //[EnableCors("Angular")]
        //public async Task<ActionResult<IEnumerable<Juror>>> GetJurorsByFirstName(String firstName) {
        //    return await _context.Jurors.Where(a => a.FirstName.Contains(firstName)).ToArrayAsync();
        //}



        private bool JurorExists(int id) {
            return _context.Jurors.Any(e => e.Id == id);
        }
    }
}
