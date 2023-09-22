using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using ModelsStore.DbConn.Utilities;
using ModelsStore.DTO.PARAM;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        [HttpGet("GetAllUser")]
        public IActionResult GetAllUser()
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
        [HttpPost("ConsultaUsuario")]
        public IActionResult ConsultaUsuario([FromBody] CLIENTE_CONSULTA request)
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
        [HttpPut("CreaUsuario")]
        public IActionResult CreaUsuario([FromBody] USUARIOS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            var Hashing = new EncryptData();

            try
            {
                var estado = new ESTADOS();

                var query2 = new Query("ESTADOS").Select("CODIGO_ESTADO").Where("ACTIVO", 1).Where("ESTADO", "ACTIVO").Limit(1);

                var sql2 = execute.ExecuterCompiler(query2);

                execute.DataReader(sql2, reader =>
                {
                    estado = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                var pass = Hashing.Encrypt(request.PASSWORD_USER);

                request.PASSWORD_USER = pass;

                request.CODIGO_USUARIO =  Guid.NewGuid().ToString();

                request.ESTADO = estado.CODIGO_ESTADO;

                var query = new Query("USUARIOS").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("EliminarUsuario")]
        public IActionResult Delete([FromBody] CLIENTE_CONSULTA request)
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

                var query = new Query("USUARIO").Where("CODIGO_USUARIO", request.CODIGO_CLIENTE).AsUpdate(new
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
