import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Status, Task, TasksState } from "../types/task";
import { tasksService } from "../services/tasksService";

export const loadTasks = createAsyncThunk("tasks/load", async () => {
  const tasks = await tasksService.getAll();
  return tasks.data;
});

export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Partial<Task> & { status: string }) => {
    const newTask = await tasksService.create(task);
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }: { id: number; data: Partial<Task> }) => {
    return await tasksService.update(id, data);
  }
);

export const moveTask = createAsyncThunk(
  "tasks/move",
  async (payload: { id: number; status: Status; position: number }) => {
    const { id, status, position } = payload;
    return await tasksService.update(id, { status, position });
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: number) => {
    await tasksService.remove(id);
    return id;
  }
);

const initialState: TasksState = { items: [], loading: false };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Partial<Task> & { status: string }>) => {
      state.items.push({
        id: Date.now(),
        title: action.payload.title || "",
        description: action.payload.description || "",
        status: action.payload.status as any,
        position: state.items.length,
      });
    },

    removeTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    moveTaskLocal: (state, action: PayloadAction<{ id: number; status: Status; position: number }>) => {
      const { id, status, position } = action.payload;
      const taskIndex = state.items.findIndex((t) => t.id === id);
      if (taskIndex === -1) return;

      state.items[taskIndex].status = status;
      state.items[taskIndex].position = position;

      const sameColumnTasks = state.items
        .filter((t) => t.status === status && t.id !== id)
        .sort((a, b) => a.position - b.position);

      sameColumnTasks.splice(position, 0, state.items[taskIndex]);

      sameColumnTasks.forEach((t, idx) => {
        t.position = idx;
      });

      const otherTasks = state.items.filter((t) => t.status !== status && t.id !== id);
      state.items = [...otherTasks, ...sameColumnTasks];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => { state.loading = true; })
      .addCase(loadTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(loadTasks.rejected, (state) => { state.loading = false; })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(moveTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
      })
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { addTask, removeTask, moveTaskLocal } = tasksSlice.actions;
export default tasksSlice.reducer;
