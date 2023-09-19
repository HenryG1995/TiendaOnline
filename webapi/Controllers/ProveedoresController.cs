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
        [HttpGet]
        public ActionResult Get()
        {

            return Ok();
        }
        [HttpPost]
        public ActionResult Post()
        {

            return Ok();
        }
        [HttpPut]
        public ActionResult Put()
        {

            return Ok();
        }
        [HttpDelete]
        public ActionResult Delete()
        {
            return Ok();
        }


    }
}
