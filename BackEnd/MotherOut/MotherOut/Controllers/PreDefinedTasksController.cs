using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MotherOut_BackEnd.Models;

namespace MotherOut_BackEnd.Controllers
{
    public class PreDefinedTasksController : ApiController
    {
        // GET: api/PreDefinedTasks
        public IEnumerable<PreDefinedTask> Get()
        {
            var repo = new PreDefinedTaskRepository();
            List<PreDefinedTask> preDefinedTasks = repo.getPreDefinedTasks();
            return preDefinedTasks;
        }

        // GET: api/PreDefinedTasks/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PreDefinedTasks
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/PreDefinedTasks/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PreDefinedTasks/5
        public void Delete(int id)
        {
        }
    }
}
