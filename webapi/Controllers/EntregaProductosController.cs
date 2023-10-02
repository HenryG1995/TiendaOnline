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
    public class EntregaProductosController : ControllerBase
    {
        [HttpGet("GetAllEntregaProd")]
        public IActionResult GetAllEntregaProd()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {

                var query = new Query("ENTREGA_PRODUCTO").Select("*");

                var list = new List<ENTREGA_PRODUCTO>();

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<ENTREGA_PRODUCTO>.MapToList(reader);
                });


                return Ok(list.ToArray());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("IngresaEntrega")]
        public IActionResult IngresaEntrega([FromBody] ENTREGA_PRODUCTO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("IngresaEntrega").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut]
        public IActionResult Put()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {


                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete]
        public IActionResult Delete()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {


                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }


    }
}
