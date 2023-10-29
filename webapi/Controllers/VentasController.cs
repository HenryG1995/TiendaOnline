using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;
using Microsoft.AspNetCore.Http;
using ModelsStore.DTO.PARAM;
using Microsoft.VisualBasic;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        [HttpGet("BitacoraEntrega")]//recibe el estado a consultar nota si necesita todos los estados enviar estado en null
        public ActionResult BitacoraEntrega([FromQuery] CONSULTA_CODIGO_ESTADO request)
        {
            var execute = new ExecuteFromDBMSProvider();

            var query = new Query("VENTAS");

            if (request.CODIGO_ESTADO.IsNullOrEmpty() == false)
            {
                query.Where("ESTADO", request.CODIGO_ESTADO);

            };

            var sql = execute.ExecuterCompiler(query);

            var list = new List<VENTAS>();

            execute.DataReader(sql, reader =>
            {
                list = DataReaderMapper<VENTAS>.MapToList(reader);
            });

            return Ok(list.ToList());
        }

        [HttpGet("ListVentasAll")]//consulta con filtro puede recibir codigo cliente , estado ,aplica nota, fecha de venta, codigo de venta
        public IActionResult ListVentasAll([FromQuery] VENTAS request)
        {

            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var lista = new List<VENTAS>();

                #region Filtros

                var query = new Query("Ventas").Select("*");

                if (request.CODIGO_CLIENTE != null) { query.Where("CODIGO_CLIENTE", request.CODIGO_CLIENTE); }

                if (request.ESTADO != null) { query.Where("ESTADO", request.ESTADO); }

                if (request.APLICA_NOTA >= 0) { query.Where("APLICA_NOTA", request.APLICA_NOTA); }

                if (request.FECHA_VENTA.ToString() != null) { query.Where("FECHA_VENTA", request.FECHA_VENTA); }

                if (request.CODIGO_VENTA != null) { query.Where("CODIGO_VENTA", request.CODIGO_VENTA); }

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    lista = DataReaderMapper<VENTAS>.MapToList(reader);
                });

                #endregion

                return Ok(lista.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpPut("ActualizaVenta")] //RECIBO CODIGO DE VENTA llave para todos ,CODIGO ESTADO = actual o nuevo, CODIGO NOTA = actual o nuevo, APLICA NOTA = 0 o  1
        public IActionResult ActualizaVenta([FromBody] VENTAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var query = new Query("VENTAS").AsUpdate(new
                {
                    ESTADO = request.ESTADO,

                    FECHA_ACTUALIZACION = DateAndTime.Now

                }).Where("CODIGO_VENTA", request.CODIGO_VENTA);



                var sql = execute.ExecuterCompiler(query);

                var queryFR = new Query("FACTURA_RESUMEN").AsUpdate(new
                {
                    estado = request.ESTADO

                }).Where("CODIGO_VENTA", request.CODIGO_VENTA);

                var queryDV = new Query("DETALLE_VENTAS").AsUpdate(new
                {
                    estado = request.ESTADO,
                });

                var sqlFR = execute.ExecuterCompiler(queryFR);

                var sqlDV = execute.ExecuterCompiler(queryDV);

                return Ok("Venta :" + execute.ExecuteDecider(sql).ToString() + " FACTURA_RESUMEN :" + execute.ExecuteDecider(sqlFR).ToString() + " DETALLE_VENTAS :" + execute.ExecuteDecider(sqlDV).ToString());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpPost("Cancelar")]//RECIBO CODIGO DE VENTA
        public IActionResult Cancelar([FromQuery] CONSULTA_CODIGO_VENTA request)
        {
            var execute = new ExecuteFromDBMSProvider();

            try
            {
                var codigo = request.CODIGO_VENTA;

                var query = new Query("DETALLE_VENTA").Where("CODIGO_VENTA", codigo);

                var ListVentas = new List<DETALLE_VENTA>();

                var sqlDV = execute.ExecuterCompiler(query);

                execute.DataReader(sqlDV, reader =>
                {
                    ListVentas = DataReaderMapper<DETALLE_VENTA>.MapToList(reader);
                });
                //actualiza Productos
                foreach (var item in ListVentas)
                {
                    var inventario = new INVENTARIO();

                    var queryIn = new Query("INVENTARIO").Select("UNIDADES_EXISTENTES").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO);

                    var sqlin = execute.ExecuterCompiler(queryIn);

                    execute.DataReader(sqlin, reader =>
                    {
                        inventario = DataReaderMapper<INVENTARIO>.MapToObject(reader);
                    });

                    var itmUp = new Query("INVENTARIO").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO).AsUpdate(new
                    {
                        UNIDADES_EXISTENTES = item.CANTIDAD + inventario.UNIDADES_EXISTENTES
                    });

                    var itmUPsql = execute.ExecuterCompiler(queryIn);

                    var ok = execute.ExecuteDecider(itmUPsql);

                    if (ok == false)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "Error internal server ");
                    }

                }
                //consulto estado DEVOLUCION
                var ESTADO = new ESTADOS();

                var queryEstado = new Query("ESTADOS").Where("ESTADO", "CANCELADO").Limit(1);

                var sqlEstado = execute.ExecuterCompiler(queryEstado);

                execute.DataReader(sqlEstado, reader =>
                {
                    ESTADO = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                //actualiza DetalleVentas
                var queryU = new Query("DETALLE_VENTA").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
                {
                    ESTADO = ESTADO.CODIGO_ESTADO
                });
                var sqlU = execute.ExecuterCompiler(queryU);
                // execute.ExecuteDecider(sqlU);
                //actualiza Ventas
                var queryVU = new Query("VENTAS").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
                {
                    ESTADO = ESTADO.CODIGO_ESTADO
                });

                var sqlUV = execute.ExecuterCompiler(queryVU);

                //execute.ExecuteDecider(sqlUV);

                var queryFU = new Query("FACTURA_RESUMEN").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
                {
                    ESTADO = ESTADO.CODIGO_ESTADO
                });
                var sqlFU = execute.ExecuterCompiler(queryFU);
                // execute.ExecuteDecider(sqlFU);
                execute.ExecuteDecider(sqlUV); 
                
                execute.ExecuteDecider(sqlU);

                return Ok(execute.ExecuteDecider(sqlFU) );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error internal server " + ex.Message);
            }
        }

        [HttpPost("Venta")] //LISTA DE VENTALIST ESTA SOLO OBTENGO CODIGO DE PRODUCTO , CODIGO DE CLIENTE CANTIDAD DE PRODUCTOS 
        public IActionResult Venta([FromBody] List<VENTALIST> request)
        {
            var codigo_venta = Guid.NewGuid().ToString();

            var execute = new ExecuteFromDBMSProvider();

            var detalle_venta_list = new List<DETALLE_VENTA>();

            try
            {
                var venta = new VENTAS();

                var FACTURA_RESUMEN = new FACTURA_RESUMEN();
                long total = 0;

                var pos = 1;

                var QUERY2 = new Query("ESTADOS").Select("CODIGO_ESTADO").Where("ESTADO", "FACTURADO").Limit(1);

                var ESTADOS = new ESTADOS();

                var SQL2 = execute.ExecuterCompiler(QUERY2);

                execute.DataReader(SQL2, reader =>
                {
                    ESTADOS = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                FACTURA_RESUMEN.CODIGO_VENTA = codigo_venta.ToString();

                FACTURA_RESUMEN.FECHA_EMISION = DateTime.Now;

                FACTURA_RESUMEN.TOTAL_PRODUCTOS = request.Count();

                FACTURA_RESUMEN.ESTADO = ESTADOS.CODIGO_ESTADO;

                FACTURA_RESUMEN.FECHA_ACTUALIZACION = DateTime.Now;

                //llena la lista de ventas
                foreach (var item in request)
                {
                    var list2 = new INVENTARIO();
                    var detalleventa = new DETALLE_VENTA();
                    //var QUERY = new Query("INVENTARIO").Select("PRECIO,UNIDADES_EXISTENTES,DESCUENTO,ACTIVA_DESCUENTO").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO);
                    var QUERY = new Query("INVENTARIO").Select("PRECIO", "UNIDADES_EXISTENTES").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO);

                    var sql2 = execute.ExecuterCompiler(QUERY);

                    execute.DataReader(sql2, reader =>
                    {
                        list2 = DataReaderMapper<INVENTARIO>.MapToObject(reader);
                    });

                    detalleventa.CODIGO_PRODUCTO = item.CODIGO_PRODUCTO;
                    detalleventa.CODIGO_VENTA = codigo_venta.ToString();
                    detalleventa.ESTADO = ESTADOS.CODIGO_ESTADO;
                    detalleventa.CANTIDAD = item.CANTIDAD;



                    //detalle_venta_list[pos].ESTADO = ESTADOS.CODIGO_ESTADO;
                    long desc = 0;

                    desc = list2.PRECIO.Value * item.CANTIDAD.Value;

                    detalleventa.TOTAL = desc;

                    detalle_venta_list.Add(detalleventa);
                    total = total + desc;

                    pos++;
                }

                FACTURA_RESUMEN.TOTAL = total;
                venta.FECHA_ENTREGA = request[0].FECHA_ENTREGA;

                venta.APLICA_NOTA = request[0].APLICA_NOTA;

                venta.CODIGO_CLIENTE = request[0].CODIGO_CLIENTE;
                venta.CODIGO_VENTA = codigo_venta.ToString();
                venta.ESTADO = ESTADOS.CODIGO_ESTADO;

                var list = new List<string>();

                foreach (var item in detalle_venta_list)
                {
                    var QI = new Query("INVENTARIO").Select("NOMBRE_PRODUCTO","UNIDADES_EXISTENTES").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO);

                    var sqli = execute.ExecuterCompiler(QI);

                    var dtoInventario = new INVENTARIO();

                    execute.DataReader(sqli, reader =>
                    {
                        dtoInventario = DataReaderMapper<INVENTARIO>.MapToObject(reader);
                    });

                    if (dtoInventario.UNIDADES_EXISTENTES < item.CANTIDAD)
                    {
                        list.Add("Errror CANTIDAD DEL PRODUCTO " + dtoInventario.NOMBRE_PRODUCTO.ToString() + " insuficiente " + dtoInventario.UNIDADES_EXISTENTES + " cantidad solicitada :" + item.CANTIDAD);
                    }
                }

                if (list.Count > 0)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, list.ToList());
                }

                var QINSERT2 = new Query("FACTURA_RESUMEN").AsInsert(FACTURA_RESUMEN);

                

                var QINSERT = new Query("VENTAS").AsInsert(venta);

                var sql = execute.ExecuterCompiler(QINSERT);

                var ok = execute.ExecuteDecider(sql);
                // actualiza el inventario
                foreach (var itemconfirma in detalle_venta_list)
                {
                    var QI = new Query("INVENTARIO").Select("UNIDADES_EXISTENTES").Where("CODIGO_PRODUCTO", itemconfirma.CODIGO_PRODUCTO);

                    var sqli = execute.ExecuterCompiler(QI);

                    var dtoInventario = new INVENTARIO();

                    execute.DataReader(sqli, reader =>
                    {
                        dtoInventario = DataReaderMapper<INVENTARIO>.MapToObject(reader);
                    });

                    var UPDATEINVENTARIO = new Query("INVENTARIO").Where("CODIGO_PRODUCTO", itemconfirma.CODIGO_PRODUCTO).AsUpdate(new
                    {
                        UNIDADES_EXISTENTES = dtoInventario.UNIDADES_EXISTENTES - itemconfirma.CANTIDAD
                    });

                    var sqlUI = execute.ExecuterCompiler(UPDATEINVENTARIO);

                    var ok2 = execute.ExecuteDecider(sqlUI);

                    if (ok2 == false)
                    {
                        Console.WriteLine(sqlUI.ToString());

                        return StatusCode(StatusCodes.Status500InternalServerError, " Actualiza Inventarios ");

                    }

                }

               
                foreach (var item in detalle_venta_list)
                {
                    var QINSERT3 = new Query("DETALLE_VENTA").AsInsert(item);
                    var sql4 = execute.ExecuterCompiler(QINSERT3);
                    ok = execute.ExecuteDecider(sql4);
                }
                var sql3 = execute.ExecuterCompiler(QINSERT2);

                ok = execute.ExecuteDecider(sql3);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error internal server " + ex.Message);
            }

        }

        [HttpPost("Devolucion")]//RECIBO CODIGO DE VENTA
        public IActionResult Devolucion([FromQuery] CONSULTA_CODIGO_VENTA request)
        {
            var execute = new ExecuteFromDBMSProvider();

            try
            {
                var codigo = request.CODIGO_VENTA;

                var query = new Query("DETALLE_VENTA").Where("CODIGO_VENTA", codigo);

                var ListVentas = new List<DETALLE_VENTA>();

                var sqlDV = execute.ExecuterCompiler(query);

                execute.DataReader(sqlDV, reader =>
                {
                    ListVentas = DataReaderMapper<DETALLE_VENTA>.MapToList(reader);
                });
                //actualiza Productos
                foreach (var item in ListVentas)
                {
                    var inventario = new INVENTARIO();

                    var queryIn = new Query("INVENTARIO").Select("UNIDADES_EXISTENTES").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO);

                    var sqlin = execute.ExecuterCompiler(queryIn);

                    execute.DataReader(sqlin, reader =>
                    {
                        inventario = DataReaderMapper<INVENTARIO>.MapToObject(reader);
                    });

                    var itmUp = new Query("INVENTARIO").Where("CODIGO_PRODUCTO", item.CODIGO_PRODUCTO).AsUpdate(new
                    {
                        UNIDADES_EXISTENTES = item.CANTIDAD + inventario.UNIDADES_EXISTENTES
                    });

                    var itmUPsql = execute.ExecuterCompiler(queryIn);

                    var ok = execute.ExecuteDecider(itmUPsql);

                    if (ok == false)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "Error internal server ");
                    }

                }
                //consulto estado DEVOLUCION
                var estado = new ESTADOS();

                var queryEstado = new Query("ESTADOS").Where("ESTADO", "DEVOLUCION").Limit(1);

                var sqlEstado = execute.ExecuterCompiler(queryEstado);

                execute.DataReader(sqlEstado, reader =>
                {
                    estado = DataReaderMapper<ESTADOS>.MapToObject(reader);
                });

                //actualiza DetalleVentas
                var queryU = new Query("DETALLE_VENTA").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
                {
                    ESTADO = estado.CODIGO_ESTADO
                });
                var sqlU = execute.ExecuterCompiler(queryU);
                // execute.ExecuteDecider(sqlU);
                //actualiza Ventas
                var queryVU = new Query("VENTAS").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
                {
                    ESTADO = estado.CODIGO_ESTADO
                });

                var sqlUV = execute.ExecuterCompiler(queryVU);

                //execute.ExecuteDecider(sqlUV);

                var queryFU = new Query("FACTURA_RESUMEN").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
                {
                    ESTADO = estado.CODIGO_ESTADO
                });
                var sqlFU = execute.ExecuterCompiler(queryFU);
                // execute.ExecuteDecider(sqlFU);

                execute.ExecuteDecider(sqlUV); 
                execute.ExecuteDecider(sqlU);

                return Ok(execute.ExecuteDecider(sqlFU) );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error internal server " + ex.Message);
            }
        }

        [HttpPost("IngresoEntrega")]//recibe el codigo de venta
        public IActionResult IngresoEntrega([FromBody] CONSULTA_CODIGO_VENTA request)
        {
            var execute = new ExecuteFromDBMSProvider();

            var query = new Query("ESTADOS").Where("ESTADO", "ENTREGADO");

            var sql = execute.ExecuterCompiler(query);

            var estado = new ESTADOS();

            execute.DataReader(sql, reader =>
            {
                estado = DataReaderMapper<ESTADOS>.MapToObject(reader);
            });

            var QVenta = new Query("VENTAS").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
            {
                ESTADO = estado.CODIGO_ESTADO,
                FECHA_ACTUALIZACION = DateTime.Now,

            });

            var QFactura = new Query("FACTURA_RESUMEN").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
            {
                estado = estado.CODIGO_ESTADO,
                FECHA_ACTUALIZACION = DateTime.Now,
            });

            var QDetalle = new Query("DETALLE_VENTA").Where("CODIGO_VENTA", request.CODIGO_VENTA).AsUpdate(new
            {
                estado = estado.CODIGO_ESTADO
            });

            var sqlV = execute.ExecuterCompiler(QVenta);

            var sqlF = execute.ExecuterCompiler(QFactura);

            var sqlD = execute.ExecuterCompiler(QDetalle);


            return Ok("VENTAS :" + execute.ExecuteDecider(sqlV) + "FACTURA_RESUMEN :" + execute.ExecuteDecider(sqlF) + "DETALLE_VENTA :" + execute.ExecuteDecider(sqlD));
        }
    }
}
