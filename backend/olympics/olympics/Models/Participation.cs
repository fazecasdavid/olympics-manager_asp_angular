using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olympics.Models {
    public class Participation {
        public int? Id { get; set; }
        public int CompetitionId { get; set; }
        public int AthleteId { get; set; }
        public int Rank { get; set; }
    }
}
