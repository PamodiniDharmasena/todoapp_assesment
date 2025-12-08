using todoapp_backend.DTOs;

namespace todoapp_backend.ITaskServices
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetRecentTasksAsync(int count = 5);
    }
}
