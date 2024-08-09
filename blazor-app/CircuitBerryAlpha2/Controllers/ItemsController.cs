using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using CircuitBerryAlpha2.Models;

[Route("api/[controller]")]
[ApiController]
public class ItemsController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public ItemsController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("fetch-external-data")]
    public async Task<IActionResult> FetchExternalData()
    {
        var response = await _httpClient.GetAsync("http://localhost:3000/data");
        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();
        var item = JsonSerializer.Deserialize<Item>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Console.WriteLine(item?.ToString());

        return Ok(item);
    }
}