using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using ModelsStore.DTO.PARAM;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NotasCreditoController : ControllerBase
    {
        [HttpGet("getAllNotas")]
        public IActionResult getAllNotas()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<NOTAS_CREDITO>();

                var query = new Query("NOTAS_CREDITO").Select("*");

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<NOTAS_CREDITO>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpGet("getNota")]
        public IActionResult getNota([FromQuery] NOTAS_CREDITO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<NOTAS_CREDITO>();

                var query = new Query("NOTAS_CREDITO").Select("*").Where("CODIGO_NOTA",request.CODIGO_NOTA);
                
                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<NOTAS_CREDITO>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }


        [HttpPost("GuardaNota")]
        public IActionResult GuardaNota([FromBody] NOTAS_CREDITO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                request.CODIGO_NOTA = Guid.NewGuid().ToString();

                var query = new Query("NOTAS_CREDITO").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPost("ActualizaNota")]
        public IActionResult ActualizaNota([FromQuery] NOTAS_CREDITO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
               var query = new Query("NOTAS_CREDITO").AsUpdate(request);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("EliminaNota")]
        public IActionResult EliminaNota([FromQuery] NOTA_CREDITO_BORRAR request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("NOTAS_CREDITO").AsUpdate(new
                {
                    ACTIVO = 0
                }).Where("CODIGO_NOTA",request.codigo_nota) ;

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
