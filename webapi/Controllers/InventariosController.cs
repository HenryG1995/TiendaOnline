using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using System;
using Azure.Core;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InventariosController : ControllerBase
    {
        [HttpGet("GetAllInventario")]
        public IActionResult GetAllInventario()
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("INVENTARIO").Select("*").Where("ACTIVO", 1);

                var list = new List<INVENTARIO>();

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<INVENTARIO>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpPost("ConsultaProducto")]
        public IActionResult ConsultaProducto([FromBody] INVENTARIO request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                
                
                
                var query = new Query("INVENTARIO").Select("*").Where("ACTIVO",1);

                if (request.CODIGO_PRODUCTO != null) query.Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);
                if (request.DESCRIPCION_PRODUCTO != null) query.WhereLike("DESCRIPCION_PRODUCTO", request.DESCRIPCION_PRODUCTO);
                if (request.UUID_ESTADO != null) query.Where("UUID_ESTADO", request.UUID_ESTADO);
                if (request.CODIGO_PROVEEDOR != null) query.Where("CODIGO_PROVEEDOR", request.CODIGO_PROVEEDOR);
                if (request.NOMBRE_PRODUCTO != null) query.WhereLike("NOMBRE_PRODUCTO", request.NOMBRE_PRODUCTO);

                query.Limit(1);

                var sql = execute.ExecuterCompiler(query);

                var lista = new List<INVENTARIO>();

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<INVENTARIO>.MapToList(reader);
                });

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpPost("GuardaProducto")]
        public IActionResult GuardaProducto([FromBody] INVENTARIO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                request.CODIGO_PRODUCTO = Guid.NewGuid().ToString();

                var query = new Query("INVENTARIO").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpPut("ActualizaProducto")]
        public IActionResult ActualizaProducto([FromBody] INVENTARIO request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("INVENTARIO").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO).AsUpdate(new
                {
                       
                        NOMBRE_PRODUCTO = request.NOMBRE_PRODUCTO,
                        DESCRIPCION_PRODUCTO = request.DESCRIPCION_PRODUCTO,
                        UNIDADES_EXISTENTES = request.UNIDADES_EXISTENTES,
                        FECHA_CARGA = request.FECHA_CARGA,
                        FECHA_INGRESO = request.FECHA_INGRESO,
                        UUID_ESTADO = request.UUID_ESTADO,
                        ACTIVO = request.ACTIVO,
                        CADUCIDAD = request.CADUCIDAD

                });

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }
        [HttpDelete("BajaProducto")]
        public IActionResult BajaProducto([FromBody] INVENTARIO request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("INVENTARIO").Where("CODIGO_PRODUCTO",request.CODIGO_PRODUCTO).AsUpdate(new{
                    ACTIVO = 0
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
