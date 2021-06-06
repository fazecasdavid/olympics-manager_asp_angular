using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olympics.Models {
    public class Sponsorship {
        public int? Id { get; set; }
        public int CompetitionId { get; set; }
        public int SponsorId { get; set; }
        public int MoneyContribution { get; set; }
    }
}
