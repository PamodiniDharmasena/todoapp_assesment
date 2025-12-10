import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskForm } from '../components/TaskForm/TaskForm';

describe('TaskForm Component', () => {
  it('should render form with title and description inputs', () => {
    const mockOnSubmit = async () => {};
    render(<TaskForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

  it('should display create button', () => {
    const mockOnSubmit = async () => {};
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /create task/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should disable button when loading', () => {
    const mockOnSubmit = async () => {};
    render(<TaskForm onSubmit={mockOnSubmit} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /creating\.\.\./i });
    expect(submitButton).toBeDisabled();
  });
});
