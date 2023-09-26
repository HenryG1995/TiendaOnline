using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Npgsql;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace ModelsStore.DbConn.DbConect
{
    internal class PostgresSqlConnect
    {
        public string pgstringconnection { get; set; }
        public bool psgConnect(string strconnection )
        {
            using (var connection = new NpgsqlConnection(strconnection))
            {
                connection.Open();

                pgstringconnection = connection.ConnectionString;
                return true;
            }

        }
        public int execute(string sqlexecute)
        {

            NpgsqlConnection connection = new NpgsqlConnection(sqlexecute);
            connection.Open();

            NpgsqlCommand command = new NpgsqlCommand(sqlexecute, connection);
            command.ExecuteReader();
            connection.Close();
            return 1;
        }

        public DataTable selectquery(string sqlexecute)
        {
            NpgsqlConnection connection = new NpgsqlConnection(sqlexecute);
            connection.Open();

            NpgsqlCommand command = new NpgsqlCommand(sqlexecute, connection);
            NpgsqlDataReader dataReader = command.ExecuteReader();
            connection.Close();

            DataTable dt =new DataTable();

            dt.Rows.Add(dataReader);

            return dt;
        }

      



    }
}
