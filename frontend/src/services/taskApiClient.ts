import axios, { type AxiosInstance } from 'axios';
import type { CreateTaskDto, Task } from '../types/task';

class TaskApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Use /api for Docker (proxied by nginx) or environment variable
    this.baseURL = import.meta.env.VITE_API_BASE_URL //|| 'http://localhost:5000/api/v1';
    console.log('API Base URL:', this.baseURL);

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

    async getRecentTasks(count: number = 5): Promise<Task[]> {
    try {
      const endpoint = import.meta.env.VITE_GET_RECENT_TASKS_ENDPOINT || '/tasks/GetRecentTasks';
      const response = await this.client.get<Task[]>(endpoint, {
        params: { count },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }  

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const endpoint = import.meta.env.VITE_CREATE_TASK_ENDPOINT; //|| '/tasks/CreateTask';
      const response = await this.client.post<Task>(endpoint, createTaskDto);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async completeTask(id: string): Promise<Task> {
    try {
      const endpoint = import.meta.env.VITE_COMPLETE_TASK_ENDPOINT || '/tasks/CompleteTask';
      const response = await this.client.post<Task>(`${endpoint}/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing task ${id}:`, error);
      throw error;
    }
  }
}

export const taskApiClient = new TaskApiClient();
