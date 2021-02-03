using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class Team
    {
        [Key]
        public int IdTeam { get; set; }
        public String TeamName { get; set; }
        public int TeamMembers { get; set; }

        public User User { get; set; }

    }
}