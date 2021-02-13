using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class User
    {
        public User(int userId, string name, string avatar, string email, string password, int nTaks, bool userMaster, int userScore, int teamId, bool help, List<Team> team)
        {
            UserId = userId;
            Name = name;
            Avatar = avatar;
            Email = email;
            Password = password;
            NTaks = nTaks;
            UserMaster = userMaster;
            UserScore = userScore;
            AsignedTeam = teamId;
            Help = help;
            Teams = team;
        }

        public User()
        {
        }

        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int NTaks { get; set; }
        public bool UserMaster { get; set; }
        public int UserScore { get; set; }
        public int AsignedTeam { get; set; }
        public bool Help { get; set; }

        //ref Team
        public List<Team> Teams { get; set; }
    }
}