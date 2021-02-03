﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class TeamsRepository
    {
        internal MotherOutContext context = new MotherOutContext();

        #region saveNewTeam

        /// <summary>
        /// Método que se encarga de introducir nuevos equipos.
        /// Con el equipo introducido se insertará a la BBDD, luego 
        /// se comprobará que se ha introducido en la BBDD con checkIdTeam
        /// y para finalizar, se le asignará a un usuario este equipo
        /// </summary>
        /// <param name="newTeam"></param>
        /// <param name="idUser"></param>
        /// <returns>bool</returns>

        internal bool saveNewTeam(Team newTeam, int idUser)
        {

            try
            {
                context.Teams.Add(newTeam);
                context.SaveChanges();

                if (checkIdTeam(newTeam.IdTeam))
                {
                    if (asignedIdTeam(newTeam.IdTeam, idUser))
                    {
                        newTeam.TeamMembers += 1;
                        context.Update(newTeam);
                        context.SaveChanges();

                        if (getUserMaster(idUser))
                        {

                            return true;

                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }

        }

        #endregion

        #region checkIdTeam

        /// <summary>
        /// Método que comprueba que un equipo exista mediante su id.
        /// </summary>
        /// <param name="idTeam"></param>
        /// <returns>bool</returns>

        internal bool checkIdTeam(int idTeam)
        {
            try
            {
                Team team = context.Teams.Where(idT => idT.IdTeam == idTeam).FirstOrDefault();

                if (team != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }

        }
        #endregion

        #region getNameTeam

        /// <summary>
        /// Método que devuelve el nombre del equipo.
        /// </summary>
        /// <param name="idTeam"></param>
        /// <returns>string</returns>

        internal string getNameTeam(int idTeam)
        {
            string teamName;

            try
            {
                Team team = context.Teams.Where(idT => idT.IdTeam == idTeam).FirstOrDefault();

                if (team != null)
                {
                    teamName = team.TeamName;
                    return teamName;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);

                throw;
            }

        }

        #endregion

        #region updateTeamName

        /// <summary>
        /// Método mediante el cual se actualiza el nombre del equipo.
        /// </summary>
        /// <param name="idTeam"></param>
        /// <param name="teamName"></param>
        /// <returns></returns>

        internal bool updateTeamName(int idTeam, string teamName)
        {
            try
            {
                Team team = context.Teams.Where(idT => idT.IdTeam == idTeam).FirstOrDefault();

                if (team != null)
                {
                    team.TeamName = teamName;
                    context.Teams.Update(team);
                    context.SaveChanges();
                    return true;

                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }

        }

        #endregion

        #region asignedIdTeam

        /// <summary>
        /// Método que nos asignará un IdTeam a un usuario.
        /// </summary>
        /// <param name="idTeam"></param>
        /// <param name="idUser"></param>
        /// <returns>bool</returns>

        internal bool asignedIdTeam(int idTeam, int idUser)
        {
            try
            {
                User newUser = context.Users.Where(idT => idT.UserId == idUser).FirstOrDefault();


                if (newUser != null)
                {
                    newUser.TeamId = idTeam;
                    newUser.UserMaster = false;
                    context.Users.Update(newUser);
                    context.SaveChanges();
                    return true;

                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }
        }

        #endregion

        #region getUserMaster

        /// <summary>
        /// Método que otorga a un usuario posibilidades de Master en el team. 
        /// </summary>
        /// <param name="idUser"></param>
        /// <returns></returns>

        internal bool getUserMaster (int idUser)
        {
            try
            {
                User newUser = context.Users.Where(idT => idT.UserId == idUser).FirstOrDefault();


                if (newUser != null)
                {
                    newUser.UserMaster = true;
                    context.Users.Update(newUser);
                    context.SaveChanges();
                    return true;

                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }
        }

        #endregion

    }
}