using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class UserTasksRepository
    {
        internal MotherOutContext context = new MotherOutContext();

        internal List<UserTask> getTasks()
        {
            List<UserTask> listTasks = context.UserTasks.ToList();
            return listTasks;
        }

        //Return list of task by team
        internal List<UserTask> showTask(int IdTeam)
        {
            try
            {
                List<UserTask> userTasks = context.UserTasks.Where(u => u.TeamId == IdTeam).ToList();
                return userTasks;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                throw;
            }
        }

        //Return list of task by team and userid
        internal List<UserTask> showTaskByUser(int idUser, int idTeam)
        {
            try
            {
                List<UserTask> userTasks = context.UserTasks.Where(u => u.TeamId == idTeam && u.UserId == idUser).ToList();
                return userTasks;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                throw;
            }
        }

        internal bool createTask(UserTask userTask)
        {
            try
            {
                context.UserTasks.Add(userTask);
                context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                return false;
                throw;
            }
        }

        internal void createDefaultTask(int IdTeam)
        {
            Team team = new Team();
            try
            {
                //if (team.checkIdTeam()) //Descomentar cuando se mergee
                //{
                List<PreDefinedTask> preDefinedTasks = preDefinedTasks = context.PreDefinedTasks.ToList();
                Icon iconPreDefined = iconPreDefined = context.Icons.FirstOrDefault(i => i.IconId == 1);

                foreach (PreDefinedTask preDefinedTask in preDefinedTasks)
                {
                    UserTask userTask = new UserTask();
                    userTask.TaskScore = preDefinedTask.TaskScore;
                    userTask.TaskName = preDefinedTask.TaskName;
                    userTask.TeamId = IdTeam;
                    userTask.TaskIcon = iconPreDefined.IconImage;

                    context.UserTasks.Add(userTask);
                    context.SaveChanges();
                }
                //}
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                throw;
            }
        }

        internal bool deleteTask(int IdTask)
        {
            try
            {
                UserTask userTask = context.UserTasks.FirstOrDefault(u => u.UserTaskId == IdTask);
                context.UserTasks.Remove(userTask);
                context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                return false;
                throw;
            }
        }

        internal bool asignedTask(int idUserTask, DateTime fecha, int idUser)
        {
            try
            {
                //if (team.checkIdUser()) //Descomentar cuando se mergee
                //{
                UserTask userTask = context.UserTasks.FirstOrDefault(t => t.UserTaskId == idUserTask);
                User user = context.Users.FirstOrDefault(u => u.UserId == idUser);

                userTask.SelectDay = fecha;
                userTask.UserId = user.UserId;
                userTask.SelectMember = user.Name;

                context.Update(userTask);
                context.SaveChanges();
                return true;
                //}
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                return false;
                throw;
            }
        }

        internal bool randomAsignment(int idTeam)
        {
            //review
            UsersRepository usersRepository = new UsersRepository();
            List<UserTask> userTasks = showTask(idTeam);
            List<User> users = usersRepository.showUserByteam(idTeam);
            Random randNum = new Random();
            bool correctAsingnment = true;

            try
            {
                int possRep = -1;
                do
                {
                    int poss = randNum.Next(0, users.Count - 1);
                    if (poss != possRep)
                    {
                        userTasks[poss].UserId = users[poss].UserId;
                        userTasks[poss].SelectMember = users[poss].Name;

                        context.Update(userTasks[poss]);
                        context.SaveChanges();
                        userTasks.Remove(userTasks[poss]);
                        correctAsingnment = true;
                    }
                    else
                    {
                        correctAsingnment = false;
                    }
                    possRep = poss;
                } while (userTasks.Count > 0) ;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inseperado: " + e);
                return false;
                throw;
            }
            return correctAsingnment;
        }

        //   private List<User> randomizedUsers(List<User> list)
        //   {
        //       List<User> randomUsers = new List<User>();
        //       Random randNum = new Random();
        //       while (list.Count > 0)
        //       {
        //           int poss = randNum.Next(0, list.Count - 1);
        //           randomUsers.Add(list[poss]);
        //           list.RemoveAt(poss);
        //       }
        //
        //       return randomUsers;
        //   }
    }
}