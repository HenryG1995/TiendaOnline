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
    public class BitacoraGeneralController : ControllerBase
    {
        [HttpGet("GettAllBit")]
        public IActionResult Get()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();    
            var lista = new List<BITACORA_GENERAL>();
            var connection = new ConectionDecider();

            connection.InitRead();

            var query = new Query("BITACORA_GENERAL").Select("*");

            var sql = execute.ExecuterCompiler(query);

            execute.DataReader(sql, reader =>
            {
                lista = DataReaderMapper<BITACORA_GENERAL>.MapToList(reader);
            });

            return Ok(lista.ToList());
        }
        [HttpPut("AddBitacora")]
        public IActionResult AddBitacora([FromBody] BITACORA_GENERAL request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            connection.InitRead();

            var query = new Query("BITACORA_GENERAL").AsInsert(request);

            var sql = execute.ExecuterCompiler(query);

            return Ok(execute.ExecuteDecider(sql));
        }
        [HttpPost("ConsultaBitacoraxCliente")]
        public IActionResult ConsultaBitacoraxCliente([FromBody] CLIENTE_CONSULTA request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();
            var lista = new List<BITACORA_GENERAL>();
            var connection = new ConectionDecider();

            connection.InitRead();

            var query = new Query("BITACORA_GENERAL").Select("*").Where("CODIGO_USUARIO",request.CODIGO_CLIENTE);

            var sql = execute.ExecuterCompiler(query);

            execute.DataReader(sql, reader =>
            {
                lista = DataReaderMapper<BITACORA_GENERAL>.MapToList(reader);
            });

            return Ok(lista.ToList());
        }
     
    }
}
