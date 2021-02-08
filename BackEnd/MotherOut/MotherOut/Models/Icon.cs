using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class Icon
    {
        [Key]
        public int IconId { get; set; }
        public byte[] IconImage { get; set; }
    }
}