import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskList } from '../components/TaskList/TaskList';
import type { Task } from '../types/task';

describe('TaskList Component', () => {
  it('should render empty state when no tasks', () => {
    const mockOnTaskComplete = async () => {};
    render(<TaskList tasks={[]} onTaskComplete={mockOnTaskComplete} />);

    expect(screen.getByText(/no active tasks yet/i)).toBeInTheDocument();
  });

  it('should render task list title with task count', () => {
    const mockOnTaskComplete = async () => {};
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Desc 1',
        isCompleted: false,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Desc 2',
        isCompleted: false,
        createdAt: '2024-01-15T10:25:00Z',
        updatedAt: '2024-01-15T10:25:00Z',
      },
    ];

    render(<TaskList tasks={tasks} onTaskComplete={mockOnTaskComplete} />);

    expect(screen.getByText(/active tasks \(latest 2\)/i)).toBeInTheDocument();
  });

  it('should render all tasks', () => {
    const mockOnTaskComplete = async () => {};
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Desc 1',
        isCompleted: false,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Desc 2',
        isCompleted: false,
        createdAt: '2024-01-15T10:25:00Z',
        updatedAt: '2024-01-15T10:25:00Z',
      },
    ];

    render(<TaskList tasks={tasks} onTaskComplete={mockOnTaskComplete} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
