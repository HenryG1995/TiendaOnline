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
    public class SeguimientoEntregaController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
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
