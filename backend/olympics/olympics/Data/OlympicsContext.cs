using Microsoft.EntityFrameworkCore;
using olympics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olympics.Data {
    public class OlympicsContext : DbContext {

        public OlympicsContext(DbContextOptions<OlympicsContext> options)
            : base(options) { }

        public DbSet<Athlete> Athletes { get; set; }
        public DbSet<Participation> Participations { get; set; }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Juror> Jurors { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<Sponsorship> Sponsorships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Athlete>()
                .HasKey(c => c.Id);
            modelBuilder.Entity<Participation>()
               .HasKey(c => c.Id);
            modelBuilder.Entity<Competition>()
               .HasKey(c => c.Id);
            modelBuilder.Entity<Juror>()
               .HasKey(c => c.Id);
            modelBuilder.Entity<Sponsor>()
               .HasKey(c => c.Id);
            modelBuilder.Entity<Sponsorship>()
               .HasKey(c => c.Id);


            modelBuilder.Entity<Athlete>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Participation>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Competition>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Juror>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Sponsor>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Sponsorship>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
