using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.PARAM;
using ModelsStore.DTO.TABLES;
using ModelsStore.DTO.VIEWS;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Azure.Core;
using ModelsStore.DTO.PARAM;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        [HttpGet("GetAllClient")]
        public IActionResult GetAllClient()
        {
            try
            {
                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

                var connection = new ConectionDecider();

                connection.InitRead();

                var query = new Query("V_CLIENTE").Select("*");

                var sql = execute.ExecuterCompiler(query);

                var list = new List<V_CLIENTE>();

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<V_CLIENTE>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpPost("ConsultaFiltro")]
        public IActionResult ConsultaFiltro([FromBody] V_CLIENTE request)
        {
            try
            {
                ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

                var connection = new ConectionDecider();

                connection.InitRead();

                var query = new Query("V_CLIENTE").Select("*");

                if (request.CODIGO_ESTADO.IsNullOrEmpty() == false)
                {

                    var query1 = new Query("ESTADOS").Select("ESTADO").Where("CODIGO_ESTADO", request.CODIGO_ESTADO);
                    
                    var sql1 = execute.ExecuterCompiler(query1);

                    var obj = new ESTADOS();

                    execute.DataReader(sql1, reader =>
                    {
                        obj = DataReaderMapper<ESTADOS>.MapToObject(reader);
                    });

                    query.Where("ESTADO", obj.ESTADO);
                }


                if (request.NIT.IsNullOrEmpty() == false) query.Where("NIT", request.NIT);

                if (request.TELEFONO.ToString().IsNullOrEmpty() == false) query.Where("TELEFONO", request.TELEFONO);

                if (request.DIRECCION_CLIENTE.IsNullOrEmpty() == false) query.WhereLike("DIRECCION_CLIENTE", request.DIRECCION_CLIENTE);

                if (request.SEGUNDO_APELLIDO.IsNullOrEmpty() == false) query.WhereLike("SEGUNDO_APELLIDO", request.SEGUNDO_APELLIDO);

                if (request.PRIMER_APELLIDO.IsNullOrEmpty() == false) query.WhereLike("PRIMER_APELLIDO", request.SEGUNDO_APELLIDO);


                if (request.PRIMER_NOMBRE.IsNullOrEmpty() == false) query.WhereLike("PRIMER_NOMBRE", request.PRIMER_NOMBRE);

                if (request.SEGUNDO_NOMBRE.IsNullOrEmpty() == false) query.WhereLike("SEGUNDO_NOMBRE", request.SEGUNDO_NOMBRE);

                if (request.CODIGO_CLIENTE.IsNullOrEmpty() == false)
                {
                
                    var vlist = new V_CLIENTE_R();

                    var list = new List<CLIENTE>();

                    var query2 = new Query("CLIENTE").Where("CODIGO_CLIENTE",request.CODIGO_CLIENTE);

                    var sql2 = execute.ExecuterCompiler(query2);

                    execute.DataReader(sql2, reader =>
                    {
                      list   = DataReaderMapper<CLIENTE>.MapToList(reader);
                    });

                    var querycategoria = new Query("CATALOGO_CATEGORIAS").Select("*").Where("CODIGO_CATEGORIA", list[0].CODIGO_CATEGORIA.ToString());
                    var categorias = new CATALOGO_CATEGORIAS();
                    var sqlcat = execute.ExecuterCompiler(querycategoria);
                    execute.DataReader(sqlcat, reader =>
                    {
                        categorias = DataReaderMapper<CATALOGO_CATEGORIAS>.MapToObject(reader);
                    });

                    var query1 = new Query("ESTADOS").Select("ESTADO").Where("CODIGO_ESTADO", list[0].CODIGO_ESTADO.ToString());

                    var sql1 = execute.ExecuterCompiler(query1);

                    var obj = new ESTADOS();

                    execute.DataReader(sql1, reader =>
                    {
                        obj = DataReaderMapper<ESTADOS>.MapToObject(reader);
                    });

                   vlist.CODIGO_CLIENTE = request.CODIGO_CLIENTE;
                   vlist.PRIMER_NOMBRE = list[0].PRIMER_NOMBRE;
                   vlist.SEGUNDO_NOMBRE = list[0].SEGUNDO_NOMBRE;
                   vlist.NIT = list[0].NIT ?? null;
                   vlist.CATEGORIA = categorias.NOMBRE_CATEGORIA;
                   vlist.PRIMER_APELLIDO = list[0].PRIMER_APELLIDO;
                   vlist.SEGUNDO_APELLIDO = list[0].SEGUNDO_APELLIDO;
                   vlist.ESTADO = obj.ESTADO;
                   vlist.DIRECCION_CLIENTE = list[0].DIRECCION_CLIENTE;
                    vlist.TELEFONO = list[0].TELEFONO;

                    var nl = new List<V_CLIENTE_R>();

                    nl.Add(vlist);

                    return Ok(nl.ToList());

                };


            var sql = execute.ExecuterCompiler(query);

            var lista = new List<V_CLIENTE_R>();

            execute.DataReader(sql, reader =>
            {
                lista = DataReaderMapper<V_CLIENTE_R>.MapToList(reader);
            });

            return Ok(lista.ToList());
        }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
    }

}


[HttpPost("InfoCliente")]
public IActionResult InfoCliente([FromBody] CLIENTE_CONSULTA request)
{
    try
    {
        var connection = new ConectionDecider();
        connection.InitRead();

        var query = new Query("CLIENTE").Select("*").Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE);

        ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();
        var sql = execute.ExecuterCompiler(query);

        var lista = new List<CLIENTE>();

        execute.DataReader(sql, reader =>
        {
            lista = DataReaderMapper<CLIENTE>.MapToList(reader);
        });

        return Ok(lista.ToList());
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
    }

}
[HttpPost("CreaCliente")]
public IActionResult CreaCliente([FromBody] CLIENTE request)
{
    ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

    var connection = new ConectionDecider();
    try
    {
        connection.InitRead();

        var query = new Query("CLIENTE").AsInsert(request);

        var sql = execute.ExecuterCompiler(query);


        return Ok(execute.ExecuteDecider(sql));

    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");

    }

}

[HttpPut("ActualizaCliente")]
public IActionResult ActualizaCliente([FromBody] CLIENTE request)
{
    ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

    var connection = new ConectionDecider();
    try
    {
        connection.InitRead();

        var query = new Query("CLIENTE").Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE).AsUpdate(new
        {
            PRIMER_NOMBRE = request.PRIMER_NOMBRE,
            SEGUNDO_NOMBRE = request.SEGUNDO_NOMBRE,
            PRIMER_APELLIDO = request.PRIMER_APELLIDO,
            SEGUNDO_APELLIDO = request.SEGUNDO_APELLIDO,
            NIT = request.NIT,
            DIRECCION_CLIENTE = request.DIRECCION_CLIENTE,
            TELEFONO = request.TELEFONO,
        }).Where("CODIGO_CLIENTE",request.CODIGO_CLIENTE);

        var sql = execute.ExecuterCompiler(query);


        return Ok(execute.ExecuteDecider(sql));

    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");

    }



}
[HttpDelete("BajaCliente")]
public IActionResult BajaCliente([FromBody] CLIENTE_CONSULTA request)
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


        var query = new Query("CLIENTE").Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE).AsUpdate(new
        {
            CODIGO_ESTADO = estado.CODIGO_ESTADO
        });

        var sql = execute.ExecuterCompiler(query);

        var query3 = new Query("USUARIOS").Where("CODIGO_USUARIO", request.CODIGO_CLIENTE).AsUpdate(new
        {
            ESTADO = estado.CODIGO_ESTADO
        });

        var sql3 = execute.ExecuterCompiler(query3);

        var result = execute.ExecuteDecider(sql3);

        return Ok(execute.ExecuteDecider(sql));

    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");

    }
}


    }
}
