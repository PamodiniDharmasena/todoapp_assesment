using todoapp_backend.DTOs;
using todoapp_backend.Models;
using todoapp_backend.Repositories;
using todoapp_backend.Services;
using todoapp_backend.ITaskServices;

namespace todoapp_backend.Services;


public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;
        
    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }
        
    public async Task<IEnumerable<TaskDto>> GetRecentTasksAsync(int count = 5)
    {
        var tasks = await _taskRepository.GetRecentActiveTasks(count);
        return tasks.Select(MapToDto);
    }

    private static TaskDto MapToDto(Models.Task task)
    {
        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt
        };
    }


}
