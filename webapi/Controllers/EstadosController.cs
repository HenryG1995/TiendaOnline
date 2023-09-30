using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EstadosController : ControllerBase
    {
        [HttpGet("GetAllStates")]
        public IActionResult GetAllStates()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("ESTADOS").Select("*");
             
                var sql = execute.ExecuterCompiler(query);
                
                var estados = new List<ESTADOS>();

                execute.DataReader(sql, reader =>
                {
                    estados = DataReaderMapper<ESTADOS>.MapToList(reader);
                });

                return Ok(estados.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("ObtenerEstado")]
        public IActionResult ObtenerEstado([FromBody] ESTADOS request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("ESTADOS").Select("*").Where("CODIGO_ESTADO",request.CODIGO_ESTADO);

                var sql = execute.ExecuterCompiler(query);

                var list = new List<ESTADOS>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<ESTADOS>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("CrearEstado")]
        public IActionResult CrearEstado([FromBody] ESTADOS request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                request.CODIGO_ESTADO = Guid.NewGuid().ToString();

                var query = new Query().AsInsert(request);
                var sql = execute.ExecuterCompiler(query);
                

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("DesactivaEstado")]
        public IActionResult DesactivaEstado([FromBody] ESTADOS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                request.ACTIVO = 0;
                var query = new Query("ESTADOS").Where("CODIGO_ESTADO",request.CODIGO_ESTADO).AsUpdate(request);
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
