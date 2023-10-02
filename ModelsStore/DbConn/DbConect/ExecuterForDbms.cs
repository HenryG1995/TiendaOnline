using ClassDB.SqlKataTools;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Npgsql;
using Oracle.ManagedDataAccess.Client;
using SqlKata;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ModelsStore.DbConn.DbConect.OraConnect;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ModelsStore.DbConn.DbConect
{
    public class ExecuteFromDBMSProvider
    {

        public OraConnect ora = new OraConnect();

        public string ExecuterCompiler(Query sqlQuery)
        {
            try
            {

                var DbmsProvider = Environment.GetEnvironmentVariable("DbmsProvider");
                if (DbmsProvider == null)
                {
                    Console.WriteLine("No tiene cargado el DbmsProvider");
                }
                else
                {
                    Console.WriteLine("tiene cargado el DbmsProvider" + DbmsProvider.ToString());
                }


                string SqlQuery;
                switch (DbmsProvider)
                {
                    case "oracle":
                        {


                            SqlQuery = SqlKataCommpiler.OraCompileQuery(sqlQuery);
                            return SqlQuery;

                        }
                    case "sqlserver":
                        {
                            SqlQuery = SqlKataCommpiler.SqlCompileQuery(sqlQuery);
                            return SqlQuery;

                        }
                    case "postgresql":
                        {
                            SqlQuery = SqlKataCommpiler.PsgCompileQuery(sqlQuery);
                            return SqlQuery;

                        }
                    default:
                        Console.WriteLine("error : " + DbmsProvider);
                        return sqlQuery.ToString();


                }


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return ex.Message;
            }

        }

        public bool ExecuterOracle(string sqlQuery)
        {
            try
            {
                var STR = Environment.GetEnvironmentVariable("STR");


                Console.WriteLine(STR);


                ora.ConnectToDatabase(STR);

                OracleCommand ora_Command = new OracleCommand(sqlQuery, ora.OracleContext);
                ora_Command.CommandType = CommandType.Text;
                ora_Command.CommandText = sqlQuery;
                ora_Command.ExecuteNonQuery();
                ora.OracleContext.Close();
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error : * ---- " + sqlQuery + " ---- *" + ex.Message);
                return false;
            }


        }

        public bool ExecuteDecider(string Query)
        {

            try
            {
                var DbmsProvider = Environment.GetEnvironmentVariable("DbmsProvider");

                if (DbmsProvider == null)
                {
                    return false;
                }

                switch (DbmsProvider)
                {
                    case "oracle":
                        {
                            var r = ExecuterOracle(Query);
                            return r;
                        }
                    case "sqlserver":
                        {

                            var r = ExecuterSQL(Query);
                            return r;
                        }

                    case "postgresql":
                        {
                            var r = ExecuterPSG(Query);
                            return r;
                        }

                }


                return true;
            }
            catch
            {
                return false;
            }

        }


        public bool ExecuterSQL(string sqlQuery)
        {

            var STR = Environment.GetEnvironmentVariable("STR");


            Console.WriteLine(STR);

            try
            {
                using (var connection = new SqlConnection(STR))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand(sqlQuery, connection);
                    command.CommandType = CommandType.Text;
                    command.CommandText = sqlQuery;
                    command.ExecuteReader();
                    connection.Close();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message + " cmdquery " + sqlQuery);
                return false;
            }




        }
        public bool ExecuterPSG(string sqlQuery)
        {
            try
            {
                var STR = Environment.GetEnvironmentVariable("STR");


                Console.WriteLine(STR);

                NpgsqlConnection connection = new NpgsqlConnection(STR);
                connection.Open();

                NpgsqlCommand command = new NpgsqlCommand(sqlQuery, connection);
                command.ExecuteReader();
                connection.Close();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error : * ---- " + sqlQuery + " ---- *" + ex.Message);
                return false;
            }

        }

        public void DataReader(string cmdQuery, Action<DbDataReader> action)
        {


            var DbmsProvider = Environment.GetEnvironmentVariable("DbmsProvider");




            switch (DbmsProvider)
            {
                case "oracle":
                    {
                        try
                        {
                            if (ora.OracleContext.State == ConnectionState.Closed)
                            {
                                var STR = Environment.GetEnvironmentVariable("STR");


                                Console.WriteLine(STR);

                                if (STR != null)
                                {

                                    OraConnect ora = new OraConnect();
                                    Console.WriteLine("pass");

                                    ora.ConnectToDatabase(STR);

                                    OracleCommand ora_Command = new OracleCommand(cmdQuery, ora.OracleContext);
                                    ora_Command.CommandType = CommandType.Text;
                                    using (OracleDataReader reader = ora_Command.ExecuteReader())
                                    {
                                        action(reader);
                                    }
                                    string log = "success " + cmdQuery.ToString();
                                    ora.OracleContext.Close();
                                    Console.WriteLine("success " + cmdQuery.ToString());

                                }
                                else
                                {
                                    OracleCommand ora_Command = new OracleCommand(cmdQuery, ora.OracleContext);
                                    ora_Command.CommandType = CommandType.Text;
                                    using (OracleDataReader reader = ora_Command.ExecuteReader())
                                    {
                                        action(reader);
                                    }
                                    string log = "success " + cmdQuery.ToString();

                                    Console.WriteLine("success " + cmdQuery.ToString());
                                }
                            }
                            else
                            {
                                OracleCommand ora_Command = new OracleCommand(cmdQuery, ora.OracleContext);
                                ora_Command.CommandType = CommandType.Text;
                                using (OracleDataReader reader = ora_Command.ExecuteReader())
                                {
                                    action(reader);
                                }
                                string log = "success " + cmdQuery.ToString();

                                Console.WriteLine("success " + cmdQuery.ToString());
                            }
                            break;

                        }

                        catch (Exception ex)
                        {
                            string log = "error " + cmdQuery + " " + ex.Message;

                            Console.WriteLine(log);
                            break;
                        }
                    }


                case "postgresql":
                    {
                        try
                        {
                            var STR = Environment.GetEnvironmentVariable("STR");
                            NpgsqlConnection npgsql = new NpgsqlConnection(STR);


                            if (npgsql.State == ConnectionState.Closed)
                            {



                                Console.WriteLine(STR);

                                if (STR != null)
                                {
                                    npgsql.Open();
                                    Console.WriteLine("pass");

                                    NpgsqlCommand command = new NpgsqlCommand(cmdQuery, npgsql);

                                    command.CommandType = CommandType.Text;
                                    using (NpgsqlDataReader reader = command.ExecuteReader())
                                    {
                                        action(reader);
                                    }
                                    string log = "success " + cmdQuery.ToString();

                                    Console.WriteLine("success " + cmdQuery.ToString());
                                }
                                else
                                {
                                    NpgsqlCommand command = new NpgsqlCommand(cmdQuery, npgsql);

                                    command.CommandType = CommandType.Text;
                                    using (NpgsqlDataReader reader = command.ExecuteReader())
                                    {
                                        action(reader);
                                    }
                                    string log = "success " + cmdQuery.ToString();

                                    Console.WriteLine("success " + cmdQuery.ToString());
                                }
                                break;
                            }
                            else
                            {
                                NpgsqlCommand command = new NpgsqlCommand(cmdQuery, npgsql);

                                command.CommandType = CommandType.Text;
                                using (NpgsqlDataReader reader = command.ExecuteReader())
                                {
                                    action(reader);
                                }
                                string log = "success " + cmdQuery.ToString();

                                Console.WriteLine("success " + cmdQuery.ToString());

                                break;
                            }

                        }

                        catch (Exception ex)
                        {
                            string log = "error " + cmdQuery + " " + ex.Message;

                            Console.WriteLine(log);
                            break;
                        }

                    }
                case "sqlserver":
                    {
                        var STR = Environment.GetEnvironmentVariable("STR");

                        Console.WriteLine(STR);

                        try
                        {
                            using (var connection = new SqlConnection(STR))
                            {
                                if (connection.State == ConnectionState.Closed)
                                {
                                    connection.Open();
                                }

                                SqlCommand command = new SqlCommand(cmdQuery, connection);
                                command.CommandType = CommandType.Text;
                                command.CommandText = cmdQuery;

                                using (SqlDataReader reader = command.ExecuteReader())

                                {
                                    action(reader);
                                }

                                string log = "success " + cmdQuery.ToString();

                                Console.WriteLine("success " + cmdQuery.ToString());

                                break;
                            }
                        }
                        catch (Exception ex)
                        {
                            string log = "error ** " + cmdQuery.ToString();

                            Console.WriteLine("error ** " + cmdQuery.ToString());

                            break;
                        }
                    }
            }
        }





    }
}


