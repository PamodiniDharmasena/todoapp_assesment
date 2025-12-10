import { describe, it, expect } from 'vitest';
import { taskApiClient } from '../services/taskApiClient';

describe('TaskApiClient Methods Exist', () => {
  it('should have getTasks method', () => {
    expect(typeof taskApiClient.getTasks).toBe('function');
  });

  it('should have createTask method', () => {
    expect(typeof taskApiClient.createTask).toBe('function');
  });

  it('should have completeTask method', () => {
    expect(typeof taskApiClient.completeTask).toBe('function');
  });

  it('should have deleteTask method', () => {
    expect(typeof taskApiClient.deleteTask).toBe('function');
  });

  it('should have updateTask method', () => {
    expect(typeof taskApiClient.updateTask).toBe('function');
  });
});
