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
    public class PreciosController : ControllerBase
    {
        [HttpGet("GetAllPrecio")]
        public IActionResult GetAllPrecio()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<PRECIOS>();

                var query = new Query("PRECIOS").Select("*");

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<PRECIOS>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("AdicionaPrecios")]
        public IActionResult AdicionaPrecios([FromBody] PRECIOS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("PRECIOS").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("ActualizaPrecios")]
        public IActionResult ActualizaPrecios([FromBody] PRECIOS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista2 = new PRECIOS();

                var query2 = new Query("PRECIOS").Select("*").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);
                
                var sql2 = execute.ExecuterCompiler(query2);

                execute.DataReader(sql2, reader =>
                {
                    lista2 = DataReaderMapper<PRECIOS>.MapToObject(reader);
                });

                if (lista2.CODIGO_PRODUCTO == null) return Ok("codigo de producto no existe");

                var query = new Query("PRECIOS");

                query.AsUpdate(new
                {
                   PRECIO = request.PRECIO >0 ? request.PRECIO :  lista2.PRECIO,

                   ACTIVO = request.ACTIVO >= 0 ? request.ACTIVO : lista2.ACTIVO,
                   
                   DESCUENTO = request.DESCUENTO = request.DESCUENTO >=0 ? request.DESCUENTO : lista2.DESCUENTO,
                   
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
