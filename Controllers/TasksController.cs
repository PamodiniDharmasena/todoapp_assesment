using Microsoft.AspNetCore.Mvc;
using todoapp_backend.DTOs;
using todoapp_backend.ITaskServices;

namespace todoapp_backend.Controllers;

[ApiController]
[Route("api/v1/[controller]/[action]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    
    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetRecentTasks([FromQuery] int count = 5)
    {
        if (count <= 0 || count > 100)
            return BadRequest("Count must be between 1 and 100");

        try
        {
            var tasks = await _taskService.GetRecentTasksAsync(count);
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }    
}
