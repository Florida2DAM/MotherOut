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
        public string SelectMember { get; set; }
        public DateTime SelectDay { get; set; }
        public int TaskScore { get; set; }
        public byte[] TaskIcon { get; set; }
        public bool Done { get; set; }
        public String TaskName { get; set; }
        public int UserId { get; set; }

        //ref Team
        public int TeamId { get; set; }
        public Team Team { get; set; }

        public UserTask(int userTaskId, int idTeam, string selectMember, DateTime selectDay, int taskScore, byte[] taskIcon, bool done, string taskName, int userId)
        {
            UserTaskId = userTaskId;
            TeamId = idTeam;
            SelectMember = selectMember;
            SelectDay = selectDay;
            TaskScore = taskScore;
            TaskIcon = taskIcon;
            Done = done;
            TaskName = taskName;
            UserId = userId;
        }

        public UserTask()
        {

        }


    }
}