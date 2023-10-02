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
    public class CatalogoCategoriasController : ControllerBase
    {
        [HttpGet("GetAllCat")]
        public IActionResult GetAllCat()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("CATALOGO_CATEGORIAS").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var list = new List<CATALOGO_CATEGORIAS>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<CATALOGO_CATEGORIAS>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("GuardaCat")]
        public IActionResult GuardaCat([FromBody] CATALOGO_CATEGORIAS request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                request.CODIGO_CATEGORIA = Guid.NewGuid().ToString();
                
                var query = new Query("CATALOGO_CATEGORIAS").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);
                

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("ActualizaCat")]
        public IActionResult ActualizaCat([FromBody] CATALOGO_CATEGORIAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("CATALOGO_CATEGORIAS")
                    .Where("CODIGO_CATEGORIA",request.CODIGO_CATEGORIA)
                    .AsUpdate(request);

                var sql = execute.ExecuterCompiler(query);

                

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("BajaCategoria")]
        public IActionResult BajaCategoria([FromBody] CATALOGO_CATEGORIAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {

                var estado = new ESTADOS();

                var query2 = new Query("ESTADOS").Select("CODIGO_ESTADO").Where("ACTIVO", 1).Where("ESTADO", "BAJA").Limit(1);

                var sql2 = execute.ExecuterCompiler(query2);

                execute.DataReader(sql2, reader =>
                {
                    estado = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                var query = new Query("CATALOGO_CATEGORIAS").Where("CODIGO_CATEGORIA", request.CODIGO_CATEGORIA).AsUpdate(new
                {
                    ESTADO = estado.CODIGO_ESTADO
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
