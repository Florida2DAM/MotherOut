using MotherOut_BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MotherOut_BackEnd.Controllers
{
    public class UsersController : ApiController
    {
        internal UsersRepository repo = new UsersRepository();
        // GET: api/Users
        public IEnumerable<User> Get()
        {
            List<User> users = repo.getUsers();
            return users;
        }

        // GET: api/Users
        public IEnumerable<User> Get(int idTeam)
        {            
            List<User>users= repo.showUserByteam(idTeam);
            return users;
        }

        // GET: api/Users/5
        public User GetUser(int idUser)
        {            
            User user = repo.getUserById(idUser);
            return user;
        }


        public User GetUser(string email)
        {
            User user = repo.getUserByEmail(email);
            return user;
        }

        // POST: api/Users
        public int Post(User user)
        {            
            return repo.saveUser(user);            
        }

        // PUT: api/Users/5
        public bool Put(int idUser, int idTask, bool done)
        {
           return repo.updateUserScoreAndNumTask(idUser, idTask, done);
        }

        // PUT: api/Users/5
        public bool PutCompletUser(int idUser, string email, string name, string password)
        {
            return repo.updateUser(idUser, email, name, password);
        }

        // PUT: api/Users/5
        public bool PutCompletUserHelp(int idUser, bool help)
        {
            return repo.updateUserHelp(idUser, help);
        }

        public bool PutUnassignUser(int idUser)
        {
            return repo.unassignTeam(idUser);
        }

        // DELETE: api/Users/5
        public bool Delete(int idUser)
        {
            return repo.deleteUser(idUser);
        }
    }
}
