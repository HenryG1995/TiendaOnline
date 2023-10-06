using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.PARAM;
using ModelsStore.DTO.TABLES;
using ModelsStore.DTO.VIEWS;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Azure.Core;
using ModelsStore.DTO.PARAM;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        [HttpGet("GetAllClient")]
        public IActionResult GetAllClient()
        {
            try
            {
                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

                var connection = new ConectionDecider();

                connection.InitRead();

                var query = new Query("V_CLIENTE").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var list = new List<V_CLIENTE>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<V_CLIENTE>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpGet("ConsultaFiltro")]
        public IActionResult ConsultaFiltro([FromBody] V_CLIENTE request)
        {
            try
            {
                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

                var connection = new ConectionDecider();

                connection.InitRead();

                var query = new Query("V_CLIETE").Select("*");

                if (request.CODIGO_ESTADO.Length > 0) query.Where("CODIGO_ESTADO", request.CODIGO_ESTADO);

                if ( request.NIT.Length >0 ) query.Where("NIT",request.NIT);

                if (request.TELEFONO > 0) query.Where("TELEFONO", request.TELEFONO);
                
                if (request.DIRECCION_CLIENTE.Length > 0) query.WhereLike("DIRECCION_CLIENTE", request.DIRECCION_CLIENTE);
                
                if (request.SEGUNDO_APELLIDO.Length > 0) query.WhereLike("SEGUNDO_APELLIDO", request.SEGUNDO_APELLIDO);
                
                if (request.PRIMER_APELLIDO.Length >0) query.WhereLike("PRIMER_APELLIDO", request.SEGUNDO_APELLIDO);
                
                if (request.CODIGO_CLIENTE.Length > 0) query.Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE);
                
                if (request.PRIMER_NOMBRE.Length >0) query.WhereLike("PRIMER_NOMBRE",request.PRIMER_NOMBRE);
                
                if (request.SEGUNDO_NOMBRE.Length > 0) query.WhereLike("SEGUNDO_NOMBRE", request.SEGUNDO_NOMBRE);

                var sql = execute.ExecuterCompiler(query);

                var lista = new List<V_CLIENTE>();

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<V_CLIENTE>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }

        }


        [HttpPost("InfoCliente")]
        public IActionResult InfoCliente([FromBody] CLIENTE_CONSULTA request)
        {
            try
            {
                var connection = new ConectionDecider();
                connection.InitRead();

                var query = new Query("CLIENTE").Select("*").Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE);

                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();
                var sql = execute.ExecuterCompiler(query);

                var lista = new List<CLIENTE>();

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<CLIENTE>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }

        }
        [HttpPost("CreaCliente")]
        public IActionResult CreaCliente([FromBody] CLIENTE request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();
            try
            {
                connection.InitRead();

                var query = new Query("CLIENTE").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);


                return Ok(execute.ExecuteDecider(sql));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");

            }

        }

        [HttpPut("ActualizaCliente")]
        public IActionResult ActualizaCliente([FromBody] CLIENTE request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();
            try
            {
                connection.InitRead();

                var query = new Query("CLIENTE").Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE).AsUpdate(new
                {
                    PRIMER_NOMBRE = request.PRIMER_NOMBRE,
                    SEGUNDO_NOMBRE = request.SEGUNDO_NOMBRE,
                    PRIMER_APELLIDO = request.PRIMER_APELLIDO,
                    SEGUNDO_APELLIDO = request.SEGUNDO_APELLIDO,
                    NIT = request.NIT,
                    DIRECCION_CLIENTE = request.DIRECCION_CLIENTE,
                    TELEFONO = request.TELEFONO,
                });

                var sql = execute.ExecuterCompiler(query);


                return Ok(execute.ExecuteDecider(sql));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");

            }



        }
        [HttpDelete("BajaCliente")]
        public IActionResult BajaCliente([FromBody] CLIENTE_CONSULTA request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();
            try


            {
                var estado = new ESTADOS();
                
                var query2 = new Query("ESTADOS").Select("CODIGO_ESTADO").Where("ACTIVO", 1).Where("ESTADO", "BAJA").Limit(1);
                
                var sql2 = execute.ExecuterCompiler(query2);

                execute.DataReader(sql2, reader =>
                {
                    estado = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });


                var query = new Query("CLIENTE").Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE).AsUpdate(new
                {
                    CODIGO_ESTADO = estado.CODIGO_ESTADO
                });

                var sql = execute.ExecuterCompiler(query);
                
                var query3 = new Query("USUARIOS").Where("CODIGO_USUARIO", request.CODIGO_CLIENTE).AsUpdate(new
                {
                    ESTADO = estado.CODIGO_ESTADO
                });

                var sql3 = execute.ExecuterCompiler(query3);

                var result = execute.ExecuteDecider(sql3);
                
                return Ok(execute.ExecuteDecider(sql));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");

            }
        }


    }
}
