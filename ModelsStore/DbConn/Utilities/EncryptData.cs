using ModelsStore.DbConn.DbConect;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DbConn.Utilities
{
    public class EncryptData
    {

        public string Encrypt(string Clave)
        {
            if (string.IsNullOrEmpty(Clave) == false)
            {


                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();
                var STR = Environment.GetEnvironmentVariable("STR");
                // Consumir Funcion HASH
                try
                {
                    using (OracleConnection connection = new OracleConnection(STR))
                    {
                        connection.Open();
                        var sqlQuery = "select FNHASH('" + Clave.ToString() + "') hashmd5 from dual";

                        using (OracleCommand cmd = new OracleCommand(sqlQuery, connection))
                        {
                            using (OracleDataReader reader = cmd.ExecuteReader())
                            {
                                if (reader.Read())
                                {
                                    // Accede a los datos del registro

                                    string hash = reader.GetString(0);

                                    Console.WriteLine(hash);
                                    Clave = hash;
                                    connection.Close();
                                }
                                else
                                {
                                    // No se encontraron registros
                                    Console.WriteLine("No se logro hacer el hash");
                                }
                            }
                        }
                    }
                    return Clave;
                }
                catch (Exception ex)
                {
                    return ex.Message.ToString();
                }
            }
            return "no hay hashing";

        }


    }
}
