using Microsoft.IdentityModel.Tokens;
using System;


namespace ModelsStore.DbConn.DbConect
{
    public class ConectionDecider
    {
         public string ? DbmsProvider { get; set; }
        public void InitRead()
        {
            //string? value;
            // Check whether the environment variable exists.
  // Posible asignación de referencia nula
            DbmsProvider = Environment.GetEnvironmentVariable("DbmsProvider");
  // Posible asignación de referencia nula
            // If necessary, create it.
            if (DbmsProvider == null)
            {
                Environment.SetEnvironmentVariable("DbmsProvider", "oracle");

                // Now retrieve it.
  // Posible asignación de referencia nula
                DbmsProvider = Environment.GetEnvironmentVariable("DbmsProvider");
  // Posible asignación de referencia nula
            }
            // Display the value.
            Console.WriteLine($"DbmsProvider : {DbmsProvider}\n");

            // Confirm that the value can only be retrieved from the process
            // environment block if running on a Windows system.
            //if (Environment.OSVersion.Platform == PlatformID.Win32NT)
            //{
            //    Console.WriteLine("Attempting to retrieve DbmsProvider from:");
            //    foreach (EnvironmentVariableTarget enumValue in
            //                      Enum.GetValues(typeof(EnvironmentVariableTarget)))
            //    {
            //        DbmsProvider = Environment.GetEnvironmentVariable("DbmsProvider", enumValue);
            //        Console.WriteLine($"   {enumValue}: {(DbmsProvider != null ? "found" : "not found")}");
            //    }
            //    Console.WriteLine();
            //}

            OraConnect ora = new OraConnect();
            PostgresSqlConnect psg = new PostgresSqlConnect();

            switch (DbmsProvider)
            {
                case "oracle":
                    {

                        try
                        {
                            var UserID = "db_tienda";
                            var Pass = "password2";
                            var Host = "192.168.225.135";
                            var Port = "1521";
                            var ServiceName = "DBORCL";
                            var STR = Environment.GetEnvironmentVariable("STR");

                            var constr = string.Format("USER ID={0};PASSWORD={1};DATA SOURCE= (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = {2})(PORT = {3}))(CONNECT_DATA = (SERVICE_NAME ={4}))) ;", UserID, Pass, Host, Port, ServiceName);

                            STR = STR.IsNullOrEmpty() == true ? STR : constr;

                            Console.WriteLine(STR);


                            ora.ConnectToDatabase(STR);


                            break;
                        }
                        catch
                        (Exception ex)
                        {
                            Console.WriteLine(ex.Message);

                            break;
                        }

                    }
                case "postgresql":
                    {
                        var STR = Environment.GetEnvironmentVariable("STR");

                        Console.WriteLine(STR);

                        //psg.



                        break;
                    }
                case "sqlserver":
                    {

                        break;
                    }
                default: 
                    {
                        if( string.IsNullOrEmpty(DbmsProvider)== false && DbmsProvider.Length > 0)
                        {
                            Console.WriteLine("El dbmsprovider tiene otro parametro :" + DbmsProvider.ToString());
                            break;
                        }else
                        {
                            Console.WriteLine("El dbmsprovider no esta configurado :" + null);
                            break;
                        }
                     
                    }

            }

        }

    }
}
