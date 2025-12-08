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

    public async Task<TaskDto?> GetTaskByIdAsync(Guid id)
    {
        var task = await _taskRepository.GetTaskByIdAsync(id);
        return task == null ? null : MapToDto(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
    {
        if (string.IsNullOrWhiteSpace(createTaskDto.Title))
            throw new ArgumentException("Title cannot be empty");

        if (string.IsNullOrWhiteSpace(createTaskDto.Description))
            throw new ArgumentException("Description cannot be empty");

        var task = new Models.Task
        {
            Title = createTaskDto.Title.Trim(),
            Description = createTaskDto.Description.Trim(),
            IsCompleted = false
        };

        await _taskRepository.CreateTaskAsync(task);
        await _taskRepository.SaveAsync();

        return MapToDto(task);
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
