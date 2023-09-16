using Microsoft.AspNetCore.Mvc;
using ModelsStore.DTO.TABLES;
using ModelsStore.DbConn.DbConect;
using SqlKata;
using ClassDB.SqlKataTools;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    //public IEnumerable<WeatherForecast> Get()
    //{
    //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    //    {
    //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
    //        TemperatureC = Random.Shared.Next(-20, 55),
    //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    //    })
    //    .ToArray();
    //}

    [HttpGet (Name = "ConsultaInventario")]
    public async Task<IActionResult> inventarios([FromBody] INVENTARIO request) 
    {
        ExecuteFromDBMSProvider execute = new ExecuteFromDBMSProvider();

        var lista = new List<INVENTARIO>();

        var inventariocl = new INVENTARIO();

        var connection = new ConectionDecider();

        connection.InitRead();

        var query = new Query("INVENTARIO").Select("*").Where("CODIGO_PRODUCTO", request.CODIGO_PRODUCTO);

        var sql = execute.ExecuterCompiler(query);

        execute.DataReader(sql, reader =>
        {
            lista = DataReaderMapper<INVENTARIO>.MapToList(reader);
        });

        execute.DataReader(sql, reader =>
        {
            inventariocl = DataReaderMapper<INVENTARIO>.MapToObject(reader);
        });

        return StatusCode(StatusCodes.Status200OK,inventariocl);
    }
}
