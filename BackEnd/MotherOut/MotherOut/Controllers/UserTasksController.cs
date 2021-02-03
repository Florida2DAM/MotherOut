using MotherOut_BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MotherOut_BackEnd.Controllers
{
    public class UserTasksController : ApiController
    {
        internal UserTasksRepository repo = new UserTasksRepository();

        // GET: api/UserTasks
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserTasks/5
        public List<UserTask> Get(int idTeam)
        {
            return repo.showTask(idTeam);
        }

        public List<UserTask> Get(int idUser, int idTeam)
        {
            return repo.showTaskByUser(idUser, idTeam);
        }


        public void PostDefaultUserTask(int IdTeam)
        {
            repo.createDefaultTask(IdTeam);
        }


        // POST: api/UserTasks
        public void Post([FromBody] UserTask user)
        {
            repo.createTask(user);
        }

        // PUT: api/UserTasks/5
        public void Put(int idUserTask, DateTime fecha, int idUser)
        {
            repo.asignedTask(idUserTask, fecha, idUser);
        }

        public void Put(int idTeam)
        {
            repo.randomAsignment(idTeam);
        }

        // DELETE: api/UserTasks/5
        public void Delete(int IdTask)
        {
            repo.deleteTask(IdTask);
        }
    }
}
