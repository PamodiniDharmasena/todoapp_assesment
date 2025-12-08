using Microsoft.EntityFrameworkCore;
using todoapp_backend.Data;
using todoapp_backend.Models;

namespace todoapp_backend.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly TodoDbContext _context;
        
    public TaskRepository(TodoDbContext context)
    {
        _context = context;
    }
    public async System.Threading.Tasks.Task<IEnumerable<Models.Task>> GetRecentActiveTasks(int count = 5)
    {
        return await _context.Tasks
            .Where(t => !t.IsCompleted)
            .OrderByDescending(t => t.CreatedAt)
            .Take(count)
            .ToListAsync();
    }
}
