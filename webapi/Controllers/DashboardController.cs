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
using ModelsStore.DTO.Models;
using System.Collections.Generic;


namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        [HttpPost("TotaleDashboard")]
        public IActionResult TotaleDashboard([FromBody] RANGO_FECHAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var list = new List<TotalesDashboard>();

                var queryTotal = new Query("DUAL");

                var queryTotalCLIENTE = new Query("V_CLIENTE").SelectRaw("count(*) AS TotalClientes");

                var sql = execute.ExecuterCompiler(queryTotalCLIENTE);

                var queryTotalInventario = new Query("INVENTARIO").SelectRaw("count(*) AS TotalProductos").Where("ACTIVO", 1);

                var sql2 = execute.ExecuterCompiler(queryTotalInventario);

                var queryTotalVentas = new Query("V_FACTURA").SelectRaw("count(*)");

                if (request.fecha_inicio.ToString().Length > 0 && request.fecha_fin.ToString().Length > 0) { queryTotalVentas.WhereBetween("FECHA_EMISION", request.fecha_inicio, request.fecha_fin); }

                if (request.fecha_especifica.Year > 1) { queryTotalVentas.Where("FECHA_EMISION", request.fecha_especifica); }

                var sql3 = execute.ExecuterCompiler(queryTotalVentas);

                var queryTotalPaquetes = new Query("ENTREGA_PRODUCTO").SelectRaw("count(*)").WhereRaw("ESTADO = (SELECT CODIGO_ESTADO FROM ESTADOS WHERE ESTADO = 'INGRESO')");

                var sql4 = execute.ExecuterCompiler(queryTotalPaquetes);

                var str = "";

                str = str + "select * from (SELECT (" + sql + "   )AS TOTALCLIENTES, ";
                
                str = str + " (" + sql3 + "   )AS TOTALVENTAS, ";
                
                str = str + " (" + sql4 + " ) AS TOTALINGRESO, ";
                
                str = str + " (" + sql2 + " ) AS TOTALPRODUCTOS";

                str = str + " FROM DUAL) TotalesDashboard";

                var data = execute.ExecuteDecider(str);

                execute.DataReader(str, reader =>
                {
                    list = DataReaderMapper<TotalesDashboard>.MapToList(reader);
                });

                return Ok(list.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

        [HttpGet("Last10Ventas")]
        public IActionResult LastVentas()
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var list = new List<V_FACTURA>();

                var query = new Query("V_FACTURA").Select("*").Limit(10);

                query.OrderByDesc("FECHA_EMISION");

                var sql = execute.ExecuterCompiler(query);

                execute.DataReader(sql, reader =>
                {
                    list = DataReaderMapper<V_FACTURA>.MapToList(reader);
                });

                return Ok(list.ToList());

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }

    }

}

