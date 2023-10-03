using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Mvc;
using ModelsStore.DbConn.DbConect;
using ModelsStore.DTO.TABLES;
using SqlKata;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaisController : ControllerBase
    {
        [HttpGet("ObtenerListaPais")]
        public IActionResult ObtenerListaPais()
        {
            try
            {
                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

                var connection = new ConectionDecider();

                connection.InitRead();

                var query = new Query("LISTADO_PAIS").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var list = new List<LISTADO_PAIS>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<LISTADO_PAIS>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
    }
}
