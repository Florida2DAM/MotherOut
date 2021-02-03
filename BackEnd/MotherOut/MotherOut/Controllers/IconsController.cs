using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Drawing;
using MotherOut_BackEnd.Models;


namespace MotherOut_BackEnd.Controllers
{
    public class IconsController : ApiController
    {
        // GET: api/Icons
        public IEnumerable<Image> Get()
        {
            var repo = new IconsRepository();
            List<Image> icons = repo.showIcons();
            return icons;
        }

        // GET: api/Icons/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Icons
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Icons/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Icons/5
        public void Delete(int id)
        {
        }
    }
}
