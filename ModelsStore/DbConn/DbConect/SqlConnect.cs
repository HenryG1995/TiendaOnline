using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace ModelsStore.DbConn.DbConect
{
    public class SqlConnect
    {

        public SqlConnect() {

            var STR = Environment.GetEnvironmentVariable("STR");


            Console.WriteLine(STR);


#pragma warning disable CS0219 // La variable está asignada pero nunca se usa su valor
            string connectionString = "Data Source=nombre_servidor;Initial Catalog=nombre_base_datos;User ID=nombre_usuario;Password=contraseña;";
#pragma warning restore CS0219 // La variable está asignada pero nunca se usa su valor

            try
            {
                using (var connection = new SqlConnection(STR))
                {
                    connection.Open();

                


                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }


        }


    }
}
