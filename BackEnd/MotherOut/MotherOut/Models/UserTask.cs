using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class UserTask
    {

        [Key]
        public int UserTaskId { get; set; }
        public int IdTeam { get; set; }
        public string SelectMember { get; set; }
        public DateTime SelectDay { get; set; }
        public int TaskScore { get; set; }
        public byte[] TaskIcon { get; set; }
        public bool Done { get; set; }
        public String TaskName { get; set; }

        //ref User
        public int UserId { get; set; }
        public User User { get; set; }
        //ref Icon
        //public int IconId { get; set; }
        public List<Icon> Icons { get; set; }
        //ref Predif
        public List<PreDefinedTask> PreDefinedTasks { get; set; }

        public UserTask(int userTaskId, int idTeam, string selectMember, DateTime selectDay, int taskScore, byte[] taskIcon, bool done, string taskName, int userId, User user, List<Icon> icons, List<PreDefinedTask> preDefinedTasks)
        {
            UserTaskId = userTaskId;
            IdTeam = idTeam;
            SelectMember = selectMember;
            SelectDay = selectDay;
            TaskScore = taskScore;
            TaskIcon = taskIcon;
            Done = done;
            TaskName = taskName;
            UserId = userId;
            User = user;
            Icons = icons;
            PreDefinedTasks = preDefinedTasks;
        }

        public UserTask()
        {

        }

    }
}