using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using ModelsStore.DTO.PARAM;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntregaProductosController : ControllerBase
    {
        [HttpGet("GettAllEntregas")]
        public IActionResult GettAllEntregas()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<ENTREGA_PRODUCTO>();

                var query = new Query("ENTREGA_PRODUCTO").Select("*");

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<ENTREGA_PRODUCTO>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpGet("ConsultaEntregaProducto")]
        public IActionResult ConsultaEntregaProducto([FromBody] CODIGO_ENTREGA_CONSULTA request )
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<ENTREGA_PRODUCTO>();

                var query = new Query("ENTREGA_PRODUCTO").Select("*").Where("CODIGO_ENTREGA", request.CODIGO_ENTREGA_);

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<ENTREGA_PRODUCTO>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("IngresaEntregaProducto")]
        public IActionResult IngresaEntregaProducto([FromBody] ENTREGA_PRODUCTO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {

                var query = new Query("ENTREGA_PRODUCTO").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);  


                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("ActualizaEntregaProducto")]
        public IActionResult ActualizaEntregaProducto([FromBody] ENTREGA_PRODUCTO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("ENTREGA_PRODUCTO").Where("CODIGO_ENTREGA", request.CODIGO_ENTREGA).AsUpdate(new
                {
                    request.DESCRIPCION,
                    request.DIRECCION,
                    request.COORDENADAS,

                });

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        //[HttpDelete]
        //public IActionResult Delete()
        //{
        //    ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

        //    var connection = new ConectionDecider();

        //    try
        //    {


        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
        //    }
        //}


    }
}
