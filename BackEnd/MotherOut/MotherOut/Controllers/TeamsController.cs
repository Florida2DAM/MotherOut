using MotherOut_BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MotherOut_BackEnd.Controllers
{
    public class TeamsController : ApiController
    {
        // GET: api/Teams
        public List<Team> Get()
        {
            var repo = new TeamsRepository();
            List<Team> listTeams = repo.getTeams();
            return listTeams;
        }

        public List<Team> GetTeamByName(string name)
        {
            var repo = new TeamsRepository();
            List<Team> listTeams = repo.getTeamByName(name);
            return listTeams;
        }

        public List<Team> GetTeamByTeamId(int TeamId)
        {
            var repo = new TeamsRepository();
            List<Team> listTeams = repo.getTeamById(TeamId);
            return listTeams;
        }

        // GET: api/Teams/5
        public string GetNameTeam(int idTeam)
        {
            var repo = new TeamsRepository();
            string nameTeam = repo.getNameTeam(idTeam);
            return nameTeam;
            
        }

        // POST: api/Teams
        public bool Post([FromBody] Team newTeam, int idUser)
        {
            var repo = new TeamsRepository();
            bool inserted = repo.saveNewTeam(newTeam, idUser);
            return inserted;
        }

        // PUT: api/Teams/5
        public bool Put(int idTeam, string newTeamName)
        {
            var repo = new TeamsRepository();
            bool updated = repo.updateTeamName(idTeam, newTeamName);
            return updated;
        }

        public bool Put(int idTeam, int idUser)
        {
            var repo = new TeamsRepository();
            bool updated = repo.asignedIdTeam(idTeam, idUser);
            return updated;
        }

        // DELETE: api/Teams/5
        public bool Delete(int idTeam)
        {
            var repo = new TeamsRepository();
            bool deleted = repo.deleteTeam(idTeam);
            return deleted;
        }
    }
}
