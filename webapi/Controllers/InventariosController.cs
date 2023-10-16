using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using System;
using Azure.Core;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

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

                var list = new List<INVENTARIOORA>();

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<INVENTARIOORA>.MapToList(reader);
                });

                var lista1 = new List<INVENTARIO>();
                foreach (var itemOra in list)
                {
                    var imagen = "";

                    if (itemOra.IMAGEN == null || new byte[0] == null)
                    {
                        itemOra.IMAGEN = new byte[0];
                    }
                    else
                    {
                       imagen  = Encoding.UTF8.GetString(itemOra.IMAGEN);
                    }

                    if (imagen.Length > 0)
                    {
                        INVENTARIO nuevoInventario = new INVENTARIO()
                        {
                            ACTIVO = itemOra.ACTIVO,
                            IMAGEN = imagen,
                            CADUCIDAD = itemOra.CADUCIDAD,
                            FECHA_CARGA = itemOra.FECHA_CARGA,
                            CODIGO_PRODUCTO = itemOra.CODIGO_PRODUCTO,
                            DESCRIPCION_PRODUCTO = itemOra.DESCRIPCION_PRODUCTO,
                            NOMBRE_PRODUCTO = itemOra.NOMBRE_PRODUCTO,
                            UNIDADES_EXISTENTES = itemOra.UNIDADES_EXISTENTES,
                            UUID_ESTADO = itemOra.UUID_ESTADO,
                            CODIGO_PROVEEDOR = itemOra.CODIGO_PROVEEDOR,
                            FECHA_INGRESO = itemOra.FECHA_INGRESO,
                        };

                        lista1.Add(nuevoInventario);
                    }else
                    {
                        INVENTARIO nuevoInventario = new INVENTARIO()
                        {
                            ACTIVO = itemOra.ACTIVO,
                            IMAGEN = null,
                            CADUCIDAD = itemOra.CADUCIDAD,
                            FECHA_CARGA = itemOra.FECHA_CARGA,
                            CODIGO_PRODUCTO = itemOra.CODIGO_PRODUCTO,
                            DESCRIPCION_PRODUCTO = itemOra.DESCRIPCION_PRODUCTO,
                            NOMBRE_PRODUCTO = itemOra.NOMBRE_PRODUCTO,
                            UNIDADES_EXISTENTES = itemOra.UNIDADES_EXISTENTES,
                            UUID_ESTADO = itemOra.UUID_ESTADO,
                            CODIGO_PROVEEDOR = itemOra.CODIGO_PROVEEDOR,
                            FECHA_INGRESO = itemOra.FECHA_INGRESO,
                        };

                        lista1.Add(nuevoInventario);
                    }

                   
                }


                return Ok(lista1.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpGet("ConsultaProducto")]
        public IActionResult ConsultaProducto([FromQuery] INVENTARIO request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {



                var query = new Query("INVENTARIO").Select("*");

                if (request.CODIGO_PRODUCTO != null) query.Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);
                if (request.DESCRIPCION_PRODUCTO != null) query.WhereLike("DESCRIPCION_PRODUCTO", request.DESCRIPCION_PRODUCTO);
                //if (request.UUID_ESTADO != null) query.Where("UUID_ESTADO", request.UUID_ESTADO);
                //if (request.CODIGO_PROVEEDOR != null) query.Where("CODIGO_PROVEEDOR", request.CODIGO_PROVEEDOR);
                //if (request.NOMBRE_PRODUCTO != null) query.WhereLike("NOMBRE_PRODUCTO", request.NOMBRE_PRODUCTO);

                query.Limit(1);

                var sql = execute.ExecuterCompiler(query);

                var lista = new List<INVENTARIOORA>();

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<INVENTARIOORA>.MapToList(reader);
                });
               
                var lista1 = new List<INVENTARIO>();
                foreach (var itemOra in lista)
                {
                    var imagen = "";

                    if (itemOra.IMAGEN == null || new byte[0] == null)
                    {
                        itemOra.IMAGEN = new byte[0];
                    }
                    else
                    {
                        imagen = Encoding.UTF8.GetString(itemOra.IMAGEN);
                    }

                    if (imagen.Length > 0)
                    {
                        INVENTARIO nuevoInventario = new INVENTARIO()
                        {
                            ACTIVO = itemOra.ACTIVO,
                            IMAGEN = imagen,
                            CADUCIDAD = itemOra.CADUCIDAD,
                            FECHA_CARGA = itemOra.FECHA_CARGA,
                            CODIGO_PRODUCTO = itemOra.CODIGO_PRODUCTO,
                            DESCRIPCION_PRODUCTO = itemOra.DESCRIPCION_PRODUCTO,
                            NOMBRE_PRODUCTO = itemOra.NOMBRE_PRODUCTO,
                            UNIDADES_EXISTENTES = itemOra.UNIDADES_EXISTENTES,
                            UUID_ESTADO = itemOra.UUID_ESTADO,
                            CODIGO_PROVEEDOR = itemOra.CODIGO_PROVEEDOR,
                            FECHA_INGRESO = itemOra.FECHA_INGRESO,
                        };

                        lista1.Add(nuevoInventario);
                    }
                    else
                    {
                        INVENTARIO nuevoInventario = new INVENTARIO()
                        {
                            ACTIVO = itemOra.ACTIVO,
                            IMAGEN = null,
                            CADUCIDAD = itemOra.CADUCIDAD,
                            FECHA_CARGA = itemOra.FECHA_CARGA,
                            CODIGO_PRODUCTO = itemOra.CODIGO_PRODUCTO,
                            DESCRIPCION_PRODUCTO = itemOra.DESCRIPCION_PRODUCTO,
                            NOMBRE_PRODUCTO = itemOra.NOMBRE_PRODUCTO,
                            UNIDADES_EXISTENTES = itemOra.UNIDADES_EXISTENTES,
                            UUID_ESTADO = itemOra.UUID_ESTADO,
                            CODIGO_PROVEEDOR = itemOra.CODIGO_PROVEEDOR,
                            FECHA_INGRESO = itemOra.FECHA_INGRESO,
                        };

                        lista1.Add(nuevoInventario);
                    }


                }

                return Ok(lista1.ToList());
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

                var blob = request.IMAGEN.ToString();

                request.IMAGEN = "data:img";

                var query = new Query("INVENTARIO").AsInsert(request);

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql,blob));
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
                var blob = request.IMAGEN.ToString();



                var query = new Query("INVENTARIO").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO).AsUpdate(new
                {
                       
                        NOMBRE_PRODUCTO = request.NOMBRE_PRODUCTO,
                        DESCRIPCION_PRODUCTO = request.DESCRIPCION_PRODUCTO,
                        UNIDADES_EXISTENTES = request.UNIDADES_EXISTENTES,
                        FECHA_CARGA = request.FECHA_CARGA,
                        FECHA_INGRESO = request.FECHA_INGRESO,
                        UUID_ESTADO = request.UUID_ESTADO,
                        ACTIVO = request.ACTIVO,
                        CADUCIDAD = request.CADUCIDAD,
                        IMAGEN = "data:img"

            });

                var sql = execute.ExecuterCompiler(query);

                return Ok(execute.ExecuteDecider(sql,blob));
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
