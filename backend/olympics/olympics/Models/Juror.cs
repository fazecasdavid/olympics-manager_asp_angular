using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olympics.Models {
    public class Juror {
        public int? Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Country { get; set; }
        public int Age { get; set; }
    }
}
