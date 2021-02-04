using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class UsersRepository
    {

        MotherOutContext context = new MotherOutContext();
        internal List<User> showUserByteam(int idTeam)
        {
            // Team team = new Team();
            //bool check = team.checkIdTeam(int idTeam);

            //if (check = true)
            //{
            List<User> users = new List<User>();

            users = context.Users.Where(s => s.AsignedTeam == idTeam)
                .ToList();
            return users;
            //}            

        }

        internal bool updateUserScoreAndNumTask(int idUser, int nTask, int idTask, bool done, int taskScore)
        {
            try
            {

                UserTask userTask = new UserTask();
                userTask = context.UserTasks.Where(s => s.UserTaskId == idTask).FirstOrDefault();
                User user = context.Users.FirstOrDefault(u => u.UserId == idUser);
                if (done)
                {
                    user.UserScore += userTask.TaskScore;
                    user.NTaks += 1;
                    userTask.Done = true;
                }
                else
                {
                    user.UserScore -= userTask.TaskScore;
                    user.NTaks -= 1;
                    userTask.Done = false;
                }
                context.Update(user);
                context.SaveChanges();
                context.UserTasks.Update(userTask);
                context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;

            }
        }

        internal bool updateUserHelp(int idUser, int idTeam, bool help)
        {
            User user = new User();

            try
            {
                user = context.Users.Where(s => s.UserId == idUser).FirstOrDefault();
                user.Help = help;
                context.Update(user);
                context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }
        }


        internal bool updateUser(int idUser, int idTeam, string email, string name, string password)
        {
            bool check;
            try
            {
                User user = new User();
                user = context.Users.Where(s => s.UserId == idUser).FirstOrDefault();
                if (user.Email == email)
                {
                    user.Name = name;
                    user.Password = password;
                    return true;
                }
                else
                {
                    //check = checkEmail(email);
                    //if (check)
                    //{
                        user.Email = email;
                        user.Name = name;
                        user.Password = password;
                        return true;
                 //   }
                 //   else
                 //   {
                 //       return false;
                 //   }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                return false;
                throw;
            }
        }

        internal int saveUser(User user)
        {
            int state;
            //bool check = checkEmail(email);
            //if (check == true)
            
                try
                {
                    context.Users.Add(user);
                    context.SaveChanges();
                    state = 1;
                }
                catch (Exception e)
                {
                    Console.WriteLine("Se ha producido un error inesperado: " + e);
                    state = 0;
                    throw;              
                }

            return state;

        }

        internal User getUserById(int idUser)
        {
            User user = new User();
            bool check = checkIdUser(idUser);
            if (check == true)
            {
                user = context.Users.Where(s => s.UserId == idUser).FirstOrDefault();
            }
            else
            {
                user = null;
            }
            return user;
        }

        internal bool checkIdUser(int idUser)
        {
            try
            {
                User user = new User();
                user = context.Users.Where(s => s.UserId == idUser).FirstOrDefault();
                if (user != null)
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

  //     internal bool checkEmail(string email)
  //     {
  //         try
  //         {
  //            User user = new User();
  //            user = context.Users.Where(s => s.Email == email).FirstOrDefault();
  //            if (user != null)
  //            {
  //                return true;
  //            }
  //            else
  //            {
  //                return false;
  //            }
  //        }
  //        catch (Exception e)
  //        {
  //            Console.WriteLine("Se ha producido un error inesperado: " + e);
  //            return false;
  //            throw;
  //        }
  //    }
    }
}