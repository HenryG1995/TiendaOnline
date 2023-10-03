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
    public class ZonasController : ControllerBase
    {

        [HttpGet("ObtenerZonas")]
        public IActionResult ObtenerZonas()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("LISTADO_ZONAS").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var estados = new List<LISTADO_ZONAS>();

                execute.DataReader(sql, reader =>
                {
                    estados = DataReaderMapper<LISTADO_ZONAS>.MapToList(reader);
                });

                return Ok(estados.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
    }
}
