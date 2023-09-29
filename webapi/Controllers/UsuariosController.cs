using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using ModelsStore.DbConn.Utilities;
using ModelsStore.DTO.PARAM;
using ModelsStore.DTO.VIEWS;
using Azure.Core;

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
                var query = new Query("V_USUARIOS").Select("*");
                var sql = execute.ExecuterCompiler(query);
                var list = new List<V_USUARIOS>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<V_USUARIOS>.MapToList(reader);
                });

                return Ok(list.ToList());
            
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
                var query = new Query("V_USUARIOS").Select("*").Where("CODIGO_USUARIO", request.CODIGO_CLIENTE);
                var sql = execute.ExecuterCompiler(query);
                var list = new List<V_USUARIOS>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<V_USUARIOS>.MapToList(reader);
                });

                return Ok(list.ToList());
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
        [HttpPost("Login")]
        public IActionResult Login([FromBody] USUARIOS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            var Hashing = new EncryptData();

            var pass = Hashing.Encrypt(request.PASSWORD_USER);

            try
            {
                var estado = new ESTADOS();

                var query2 = new Query("ESTADOS").Select("CODIGO_ESTADO").Where("ACTIVO", 1).Where("ESTADO", "ACTIVO").Limit(1);

                var sql2 = execute.ExecuterCompiler(query2);

                execute.DataReader(sql2, reader =>
                {
                    estado = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                var query = new Query("USUARIOS").Select("*")
                    .Where("USER_ID", request.USER_ID)
                    .Where("ESTADO", estado.CODIGO_ESTADO);

                var sql = execute.ExecuterCompiler(query);
                
                var list = new USUARIOS();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<USUARIOS>.MapToObject(reader);
                });

                if (pass != null)
                {
                    if (list.PASSWORD_USER.Length > 0 && list.PASSWORD_USER.Equals(pass)== true)
                    {
                        return Ok("pass");
                    }else
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, $"Error contraseña incorrecta!");
                    }
                }else
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, $"Error contraseña incorrecta!");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

    }
}
