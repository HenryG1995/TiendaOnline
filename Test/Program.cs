using Azure.Core;
using ClassDB.SqlKataTools;
using ModelsStore;
using ModelsStore.DbConn.DbConect;
using ModelsStore.DbConn.Utilities;
using ModelsStore.DTO.TABLES;
using SqlKata;

var UserID = "db_tienda_2";
var Pass = "password2";
var Host = "192.168.0.33";
var Port = "1521";
var ServiceName = "XE";

var constr = string.Format("USER ID={0};PASSWORD={1};DATA SOURCE= (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = {2})(PORT = {3}))(CONNECT_DATA = (SERVICE_NAME ={4}))) ;", UserID, Pass, Host, Port, ServiceName);
//ConnectionStringOracle = string.Format("CONNECTION TIMEOUT=120;PASSWORD={1};DATA SOURCE= (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = {2})(PORT = {3}))(CONNECT_DATA = (SID ={4} ))) ;USER ID={0}", UserID, Pass, Host, Port,SID);

//var constr = "User Id=db_tienda;Password='Andromeda12/';Data Source=192.168.225.132:1521/DBORCL;";

Console.WriteLine(constr);


var connection = new ConectionDecider();

ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();
connection.InitRead();


var value = "Hola123@";
var encrypt = new EncryptData();

value = encrypt.Encrypt(value);

Console.WriteLine(value);


//var lista = new List<INVENTARIO>();

//var inventariocl = new INVENTARIO();
//

//var query = new Query("INVENTARIO").Select("*");

//var sql = execute.ExecuterCompiler(query);

//execute.DataReader(sql, reader =>
//{
//    lista = DataReaderMapper<INVENTARIO>.MapToList(reader);
//});

//var fin = lista.Count;

//while (fin > 0)
//{   fin--;
//    Console.WriteLine("UUID_ESTADO :" + lista[fin].UUID_ESTADO);
//    Console.WriteLine("CADUCIDAD :" + lista[fin].CADUCIDAD);
//    Console.WriteLine("ACTIVO :" + lista[fin].ACTIVO);
//    Console.WriteLine("CODIGO_PRODUCTO :"+lista[fin].CODIGO_PRODUCTO);
//    Console.WriteLine("CODIGO_PROVEEDOR :" + lista[fin].CODIGO_PROVEEDOR);
//    Console.WriteLine("DESCRIPCION_PRODUCTO :" +lista[fin].DESCRIPCION_PRODUCTO);

//}

Console.WriteLine("pausa");


//execute.DataReader(sql, reader =>
//{
//    inventariocl = DataReaderMapper<INVENTARIO>.MapToObject(reader);
//});
