import axios, { type AxiosInstance } from 'axios';
import type { Task } from '../types/task';

class TaskApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.API_BASE_URL || 'http://localhost:44387/api';

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

    async getRecentTasks(count: number = 5): Promise<Task[]> {
    try {
      const response = await this.client.get<Task[]>('/tasks', {
        params: { count },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }  
}

export const taskApiClient = new TaskApiClient();
