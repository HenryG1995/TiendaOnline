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
    public class BitacoraGeneralController : ControllerBase
    {
        [HttpGet("GetAllBitacora")]
        public IActionResult GetAllBitacora()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {

                var query = new Query("BITACORA_GENERAL").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var lista = new List<BITACORA_GENERAL>();

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<BITACORA_GENERAL>.MapToList(reader);
                });


                return Ok(lista.ToList());

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }


        [HttpPost("GuardaBitacora")]
        public IActionResult GuardaBitacora([FromBody] BITACORA_GENERAL request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {

                var query = new Query("BITACORA_GENERAL").AsInsert(request);

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
