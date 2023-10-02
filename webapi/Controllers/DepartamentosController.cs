using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        [HttpGet("ObtenerDepartamentos")]
        public IActionResult ObtenerDepartamentos()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("LISTADO_DEPARTAMENTOS").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var departamentos = new List<LISTADO_DEPARTAMENTOS>();

                execute.DataReader(sql, reader =>
                {
                    departamentos = DataReaderMapper<LISTADO_DEPARTAMENTOS>.MapToList(reader);
                });
                return Ok(departamentos.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
    }
}
