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
    public class VentasController : ControllerBase
    {
        [HttpPost("ListVentasAll")]
        public IActionResult ListVentasAll([FromBody] VENTAS request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<VENTAS>();

                #region Filtros

                var query = new Query("Ventas").Select("*");

                if(request.CODIGO_CLIENTE != null) { query.Where("CODIGO_CLIENTE",request.CODIGO_CLIENTE); }
                if(request.ESTADO != null) { query.Where("ESTADO", request.ESTADO); }
                if(request.APLICA_NOTA >=0) { query.Where("APLICA_NOTA", request.APLICA_NOTA); }
                if(request.FECHA_VENTA.ToString() != null) { query.Where("FECHA_VENTA",request.FECHA_VENTA); }
                if(request.CODIGO_VENTA != null) { query.Where("CODIGO_VENTA",request.CODIGO_VENTA); }
                if(request.CODIGO_CLIENTE != null) { query.Where("CODIGO_CLIENTE",request.CODIGO_CLIENTE); }
                if(request.CODIGO_CLIENTE != null) { query.Where("CODIGO_CLIENTE",request.CODIGO_CLIENTE); }



                #endregion


                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost]
        public IActionResult Post()
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
