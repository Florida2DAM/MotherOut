using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public byte[] Avatar { get; set; }
        public string Email { get; set; }
        public string password { get; set; }
        public int NTaks { get; set; }
        public bool UserMaster { get; set; }
        public int UserScore { get; set; }
        public int TeamId { get; set; }
        //public int UserState { get; set; }
        public bool Help { get; set; }

        //ref Team
        public Team Team { get; set; }
        //ref Tasks
        public List<UserTask> UserTasks { get; set; }
    }
}