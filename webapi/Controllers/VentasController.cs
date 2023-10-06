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
        [HttpGet("ListVentasAll")]
        public IActionResult ListVentasAll([FromBody] VENTAS request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<VENTAS>();

                #region Filtros

                var query = new Query("Ventas").Select("*");

                if (request.CODIGO_CLIENTE != null) { query.Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE); }

                if (request.ESTADO != null) { query.Where("ESTADO", request.ESTADO); }

                if (request.APLICA_NOTA >= 0) { query.Where("APLICA_NOTA", request.APLICA_NOTA); }

                if (request.FECHA_VENTA.ToString() != null) { query.Where("FECHA_VENTA", request.FECHA_VENTA); }

                if (request.CODIGO_VENTA != null) { query.Where("CODIGO_VENTA", request.CODIGO_VENTA); }

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<VENTAS>.MapToList(reader);
                });

                #endregion

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("ActualizaVenta")]
        public IActionResult ActualizaVenta([FromBody] VENTAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("VENTAS").AsUpdate(new
                {
                    ESTADO = request.ESTADO,
                    APLICA_NOTA = request.APLICA_NOTA,
                    CODIGO_NOTA = request.CODIGO_NOTA

                }).Where("CODIGO_VENTA", request.CODIGO_VENTA);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("CancelaVenta")]
        public IActionResult Delete([FromBody] VENTAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var estado1 = new ESTADOS();

                var query2 = new Query("ESTADOS").Select("CODIGO_ESTADO").Where("ACTIVO", 1).Where("ESTADO", "ANULADO").Limit(1);

                var sql2 = execute.ExecuterCompiler(query2);

                execute.DataReader(sql2, reader =>
                {
                    estado1 = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                var query = new Query("VENTAS").AsUpdate(new
                {
                    estado = estado1.CODIGO_ESTADO
                }).Where("CODIGO_VENTA",request.CODIGO_VENTA);

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
