using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class User
    {
        public User(int userId, string name, byte[] avatar, string email, string password, int nTaks, bool userMaster, int userScore, int teamId, bool help, Team team, List<UserTask> userTasks)
        {
            UserId = userId;
            Name = name;
            Avatar = avatar;
            Email = email;
            this.password = password;
            NTaks = nTaks;
            UserMaster = userMaster;
            UserScore = userScore;
            TeamId = teamId;
            Help = help;
            Team = team;
            UserTasks = userTasks;
        }

        public User()
        {
        }

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