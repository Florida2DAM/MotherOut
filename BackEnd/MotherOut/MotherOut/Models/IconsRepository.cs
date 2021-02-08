using System;
using System.Collections.Generic;
using System.Drawing;
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

        internal List<Image> showIcons()
        {
            List<Image> images = new List<Image>();

            try
            {
                List<Icon> icons = context.Icons.ToList();

                for (int i = 0; i < icons.Count; i++)
                {
                    MemoryStream ms = new MemoryStream(icons[i].IconImage);

                    images.Add(Image.FromStream(ms));
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Se ha producido un error inesperado: " + e);

                throw;
            }

            return images;
        }

        #endregion
    }
}