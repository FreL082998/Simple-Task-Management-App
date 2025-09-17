import api from "../../../middleware/api";
import { Task } from "../types/task";

export const tasksService = {
  getAll: async (): Promise<{ data: Task[] }> => {
    const response = await api.get("/tasks");
    return { data: response.data.data || [] };
  },
  create: async (task: Partial<Task>): Promise<Task> => {
    const response = await api.post("/tasks", task);
    return response.data.data || response.data;
  },
  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data.data || response.data;
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
