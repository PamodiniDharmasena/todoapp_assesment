import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskCard } from '../components/TaskCard/TaskCard';
import type { Task } from '../types/task';

describe('TaskCard Component', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    isCompleted: false,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  };

  it('should render task card with task details', () => {
    const mockOnComplete = async () => {};
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render done button', () => {
    const mockOnComplete = async () => {};
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} />);

    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });
});