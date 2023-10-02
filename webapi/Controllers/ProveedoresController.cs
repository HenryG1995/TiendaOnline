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
    public class ProveedoresController : ControllerBase
    {
        [HttpPost("ConsultaProveedor")]
        public IActionResult ConsultaProveedor([FromBody] CodigoProveedorConsulta request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<PROVEEDORES>();

                var query = new Query("PROVEEDORES").Where("CODIGO_PROVEEDOR", request.CodigoProveedor);
                
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
        [HttpPut("AddProveedor")]
        public IActionResult AddProveedor([FromBody] PROVEEDORES request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var list = new List<PROVEEDORES>();

                var query = new Query("PROVEEDORES").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);  

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpGet("ConsultaAll")]
        public IActionResult ConsultaAll()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var Lista = new List<PROVEEDORES>();

                var query = new Query("PROVEEDORES").Select("*");

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    Lista = DataReaderMapper<PROVEEDORES>.MapToList(reader);
                });

                return Ok(Lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("DarDeBaja")]
        public IActionResult DarDeBaja([FromBody] CodigoProveedorConsulta request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {

                var query = new Query("PROVEEDORES")
                    .Where("CODIGO_PROVEEDOR", request.CodigoProveedor)
                    .AsUpdate( new
                    {
                    ACTIVO = 1
                    });
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
