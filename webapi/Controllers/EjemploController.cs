using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelsStore.DbConn.DbConect;
using ModelsStore.DTO.TABLES;
using SqlKata;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EjemploController : ControllerBase
    {
        [HttpGet("PostConsultaInventarios")]
        public IActionResult PostConsultaInventarios([FromBody] INVENTARIO request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var lista = new List<INVENTARIO>();

            var inventariocl = new INVENTARIO();

            var connection = new ConectionDecider();

            connection.InitRead();

            var query = new Query("INVENTARIO").Select("*").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);

            var sql = execute.ExecuterCompiler(query);

            execute.DataReader(sql, reader =>
            {
                lista = DataReaderMapper<INVENTARIO>.MapToList(reader);
            });

            execute.DataReader(sql, reader =>
            {
                inventariocl = DataReaderMapper<INVENTARIO>.MapToObject(reader);
            });

            return StatusCode(StatusCodes.Status200OK, inventariocl);
        }

        [HttpPost("PostConsulta")]
        public IActionResult PostConsulta([FromBody] INVENTARIO request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var lista = new List<INVENTARIO>();

            var inventariocl = new INVENTARIO();

            var connection = new ConectionDecider();

            connection.InitRead();

            var query = new Query("INVENTARIO").Select("*").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);

            var sql = execute.ExecuterCompiler(query);

            execute.DataReader(sql, reader =>
            {
                lista = DataReaderMapper<INVENTARIO>.MapToList(reader);
            });

            execute.DataReader(sql, reader =>
            {
                inventariocl = DataReaderMapper<INVENTARIO>.MapToObject(reader);
            });

            return StatusCode(StatusCodes.Status200OK, inventariocl);
        }

        [HttpGet("ConsultaInventarios")]
        public IActionResult ConsultaInventarios([FromBody] INVENTARIO request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var lista = new List<INVENTARIO>();

            var inventariocl = new INVENTARIO();

            var connection = new ConectionDecider();

            connection.InitRead();

            var query = new Query("INVENTARIO").Select("*").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);

            var sql = execute.ExecuterCompiler(query);

            execute.DataReader(sql, reader =>
            {
                lista = DataReaderMapper<INVENTARIO>.MapToList(reader);
            });

            execute.DataReader(sql, reader =>
            {
                inventariocl = DataReaderMapper<INVENTARIO>.MapToObject(reader);
            });

            return StatusCode(StatusCodes.Status200OK, inventariocl);
        }
    }
}
