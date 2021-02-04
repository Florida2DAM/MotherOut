using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class PreDefinedTask
    {
        [Key]
        public int PredifId { get; set; }
        public int TaskScore { get; set; }
        public string TaskName { get; set; }
    }
}