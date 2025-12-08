using todoapp_backend.Models;

namespace todoapp_backend.Repositories;

public interface ITaskRepository
{    
    System.Threading.Tasks.Task<IEnumerable<Models.Task>> GetRecentActiveTasks(int count = 5);
}
