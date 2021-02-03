using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotherOut_BackEnd.Models
{
    public class PreDefinedTaskRepository
    {
        internal MotherOutContext context = new MotherOutContext();

        #region getPreDefinedTasks

        /// <summary>
        /// Métodos que devolverá una lista de tareas predefinidas. 
        /// </summary>
        /// <returns></returns>

        internal List<PreDefinedTask> getPreDefinedTasks()
        {
            List<PreDefinedTask> predif;

            try
            {
                 predif = context.PreDefinedTasks.ToList();

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);
                throw;
            }

            return predif;
        }

        #endregion
    }
}