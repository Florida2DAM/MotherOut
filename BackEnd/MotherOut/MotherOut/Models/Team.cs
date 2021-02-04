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
        public int TeamId { get; set; }
        public String TeamName { get; set; }
        public int TeamMembers { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        //ref Tasks
        public List<UserTask> UserTasks { get; set; }

    }
}