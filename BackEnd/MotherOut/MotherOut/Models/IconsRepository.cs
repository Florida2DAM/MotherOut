using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;


namespace MotherOut_BackEnd.Models
{
    public class IconsRepository
    {
        internal MotherOutContext context = new MotherOutContext();

        #region showIcons

        /// <summary>
        /// Método que devuelve una lista de imágenes. 
        /// </summary>
        /// <returns>List<Images></returns>

        internal List<Icon> showIcons()
        {    
            try
            {
                List<Icon> icons = context.Icons.ToList();
                return icons;

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);

                throw;
            }      
        }

        #endregion

        #region randomAsignment

        internal void randomAsignment(int idUser)
        {

        }

        #endregion
    }
}