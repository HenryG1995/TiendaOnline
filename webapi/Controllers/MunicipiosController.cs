using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Mvc;
using ModelsStore.DbConn.DbConect;
using ModelsStore.DTO.TABLES;
using SqlKata;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MunicipiosController : ControllerBase
    {
        [HttpGet("ObtenerMunicipios")]
        public ActionResult Municipios()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("LISTADO_MUNICIPIO").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var municipios = new List<LISTADO_MUNICIPIO>();

                execute.DataReader(sql, reader =>
                {
                    municipios = DataReaderMapper<LISTADO_MUNICIPIO>.MapToList(reader);
                });

                return Ok(municipios.ToList());
            } catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
    }
}
