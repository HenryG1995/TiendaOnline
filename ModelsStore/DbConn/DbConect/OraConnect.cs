using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess;
using Oracle.ManagedDataAccess.Client;
namespace ModelsStore.DbConn.DbConect
{
    public class OraConnect
    {
        public OracleConnection OracleContext = new OracleConnection();
        public string ConnectionStringOracle { get; set; }
        public bool ConnectToDatabase(string connection)
        {
            try
            {

                // var constr = string.Format("USER ID={0};PASSWORD={1};DATA SOURCE= (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = {2})(PORT = {3}))(CONNECT_DATA = (SERVICE_NAME ={4}))) ;", UserID, Pass, Host, Port, ServiceName);
                //ConnectionStringOracle = string.Format("CONNECTION TIMEOUT=120;PASSWORD={1};DATA SOURCE= (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = {2})(PORT = {3}))(CONNECT_DATA = (SID ={4} ))) ;USER ID={0}", UserID, Pass, Host, Port,SID);
                
                if (connection != null)
                {

                    ConnectionStringOracle = connection;
                    OracleContext.ConnectionString = connection;

                }

                if (connection != null)
                {
                    OracleContext.ConnectionString = connection;
                }
                else
                {
                    OracleContext.ConnectionString = ConnectionStringOracle;
                }
                if (OracleContext.State == ConnectionState.Closed)
                {
                    OracleContext.Open();
                };

                return true;
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.ToString());


                return false;
            }

        }
    }
}
