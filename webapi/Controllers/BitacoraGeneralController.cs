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
    public class BitacoraGeneralController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {

            return Ok();
        }
        [HttpPost]
        public IActionResult Post()
        {

            return Ok();
        }
        [HttpPut]
        public IActionResult Put()
        {

            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete()
        { 

            return Ok();
        }


    }
}
