import axios, { type AxiosInstance } from 'axios';
import type { CreateTaskDto, Task } from '../types/task';

class TaskApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Use environment variable or fallback to localhost
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    this.baseURL = apiUrl;

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getTasks(): Promise<Task[]> {
    try {
      const response = await this.client.get<Task[]>('/api/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const response = await this.client.post<Task>('/api/tasks', createTaskDto);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async completeTask(id: number): Promise<Task> {
    try {
      const response = await this.client.put<Task>(`/api/tasks/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing task ${id}:`, error);
      throw error;
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.client.delete(`/api/tasks/${id}`);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }

  async updateTask(id: number, data: Partial<CreateTaskDto>): Promise<Task> {
    try {
      const response = await this.client.put<Task>(`/api/tasks/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  }
}

export const taskApiClient = new TaskApiClient();

