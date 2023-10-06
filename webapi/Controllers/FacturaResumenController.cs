using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using ModelsStore.DTO.VIEWS;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FacturaResumenController : ControllerBase
    {
        [HttpGet("AllFacturas")]
        public IActionResult AllFacturas()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("V_FACTURA").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var list = new List<V_FACTURA>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<V_FACTURA>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("GuardaFact")]
        public IActionResult GuardaFact([FromBody] FACTURA_RESUMEN request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                request.CODIGO_VENTA = Guid.NewGuid().ToString();

                var query = new Query("FACTURA_RESUMEN").AsInsert(request);

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
