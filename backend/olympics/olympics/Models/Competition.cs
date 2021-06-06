using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olympics.Models {
    public class Competition {
        public int? Id { get; set; }
        public DateTime Date { get; set; }
        public String Location { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
    }
}
