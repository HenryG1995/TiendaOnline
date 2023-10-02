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
    public class ProveedoresController : ControllerBase
    {
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("PROVEEDORES").Select("*");

                var lista = new List<PROVEEDORES>();

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<PROVEEDORES>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("AgregaProveedor")]
        public IActionResult AgregaProveedor([FromBody] PROVEEDORES request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("PROVEEDORES").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("ActualizaProveedor")]
        public IActionResult ActualizaProveedor([FromBody] PROVEEDORES request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("").AsUpdate(new
                {
                    request.NOMBRE_PROVEEDOR,
                    request.ACTIVO
                }).Where("CODIGO_PROVEEDOR",request.CODIGO_PROVEEDOR);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("BajaProveedor")]
        public IActionResult BajaProveedor([FromBody] PROVEEDORES request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("PROVEEDOR").AsUpdate(new
                {
                    ACTIVO = 0
                }).Where("CODIGO_PROVEEDOR", request.CODIGO_PROVEEDOR);

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
