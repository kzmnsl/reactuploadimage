using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace DockerPresentation.Controllers
{
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

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost("/imageUploadCore")]
        public async Task<bool> ImageUpload([FromForm]IFormFile image)
        {
          
            if (image != null && image.Length > 0)
            {
                var trustedFileName = Path.GetRandomFileName();
                 trustedFileName = trustedFileName.Substring(0,trustedFileName.IndexOf('.')) + ".jpg";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", @"images", trustedFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }
                return true;
            }
            return false;
        }
        //imageList
        [HttpGet("/imageList")]
        public async Task<List<string>> ImageList()
        {
            List<string> returnList = new List<string>();
            string pathToFolder = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot",@"images");
            foreach (string file in Directory.EnumerateFiles(
               pathToFolder,
               "*",
               SearchOption.AllDirectories)
               )
            {

                returnList.Add(Path.Combine(Directory.GetDirectoryRoot(Directory.GetCurrentDirectory()),@"images", file.Substring(pathToFolder.Length)));

            }
            foreach (var item in returnList)
            {
                Console.WriteLine(item);
            }
            return returnList;
        }
        [HttpGet]
        public string ImageUpload(string fileName)
        {
            return "Hello ";
        }
    }
}
