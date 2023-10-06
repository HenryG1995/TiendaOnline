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


        [HttpGet("TotaleDashboard")]
        public IActionResult GetAllCat([FromBody] RANGO_FECHAS request)
        {
            ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

            var connection = new ConectionDecider();

            try
            {
                var result = new TotalesDashboard();

                var listC = new TotalesDashboard();

                var listI = new TotalesDashboard();

                var listV = new TotalesDashboard();

                var listE = new TotalesDashboard();

                var queryTotalCLIENTE = new Query("V_CLIENTE").Select("count(*) AS TotalClientes");

                var sql = execute.ExecuterCompiler(queryTotalCLIENTE);

                execute.DataReader(sql, reader =>
                {
                    listC = DataReaderMapper<TotalesDashboard>.MapToObject(reader);
                });

                var queryTotalInventario = new Query("INVENTARIO").Select("count(*) AS TotalProductos").Where("ACTIVO", 1);

                var sql2 = execute.ExecuterCompiler(queryTotalInventario);

                execute.DataReader(sql2, reader =>
                {
                    listI = DataReaderMapper<TotalesDashboard>.MapToObject(reader);
                });

                var queryTotalVentas = new Query("V_FACTURA").Select("count(*)");

                if (request.fecha_inicio.ToString().Length > 0 && request.fecha_fin.ToString().Length > 0) { queryTotalVentas.WhereBetween("FECHA_EMISION", request.fecha_inicio, request.fecha_fin); }

                if (request.fecha_especifica.ToString().Length > 0) { queryTotalVentas.Where("FECHA_EMISION", request.fecha_especifica); }

                var sql3 = execute.ExecuterCompiler(queryTotalVentas);

                execute.DataReader(sql3, reader =>
                {
                    listI = DataReaderMapper<TotalesDashboard>.MapToObject(reader);
                });

                var queryTotalPaquetes = new Query("ENTREGA_PRODUCTO").Select("count(*)").WhereRaw("ESTADO = (SELECT CODIGO_ESTADO FROM ESTADOS WHERE ESTADO = 'INGRESO')");

                var sql4 = execute.ExecuterCompiler(queryTotalPaquetes);

                execute.DataReader(sql4, reader =>
                {
                    listE = DataReaderMapper<TotalesDashboard>.MapToObject(reader);
                });

                result.TotalProductos = listI.TotalProductos;

                result.TotalClientes = listC.TotalClientes;

                result.TotalVentas = listV.TotalVentas;

                result.TotalIngresoPaquete = listV.TotalIngresoPaquete;

                var list = new List<TotalesDashboard>();

                list.Add(result);

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

                query.OrderBy("FECHA_EMISION").OrderByDesc();
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

