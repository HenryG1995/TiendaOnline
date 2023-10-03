using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Mvc;
using ModelsStore.DbConn.DbConect;
using ModelsStore.DTO.TABLES;
using SqlKata;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DireccionesClienteController : ControllerBase
    {
        [HttpGet("ObtenerDireccionesCliente")]
        public IActionResult ObtenerDireccionesCliente()
        {
            try
            {
                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

                var connection = new ConectionDecider();

                connection.InitRead();

                var query = new Query("DIRECCIONES_CLIENTE").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var list = new List<DIRECCIONES_CLIENTE>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<DIRECCIONES_CLIENTE>.MapToList(reader);
                });

                return Ok(list.ToList());

            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpPost("CrearDireccionCliente")]
        public IActionResult CrearDireccionCliente([FromBody] DIRECCIONES_CLIENTE request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                connection.InitRead();
                var query = new Query("DIRECCIONES_CLIENTE").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
    }
}
