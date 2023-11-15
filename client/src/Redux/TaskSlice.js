import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.headers.common["Authorization"] = `${localStorage.getItem('token')}`
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:3001/tasks');
//   const response = await axios.get('http://localhost:5000/getAllTask');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('http://localhost:3001/tasks', task);
//   const response = await axios.post('http://localhost:5000/addTask', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ task, id }, { dispatch, getState }) => {
  const response = await axios.put(`http://localhost:3001/tasks/${id}`, task);
//   const response = await axios.put(`http://localhost:5000/updateTasks/${task.id}`, task);
  return response.data;
});

// export const updateState = createAsyncThunk('tasks/updateState', async (taskId) => {
//     const response = await axios.put(`http://localhost:3004/tasks/${taskId}`);
//   //   const response = await axios.put(`http://localhost:5000/updateStatus/${task.id}`, task);
//     return response.data;
//   });
export const updateState = createAsyncThunk('tasks/updateState', async (taskId, { getState }) => {
    const state = getState();
    const updatedTasks = state.tasks.map((task) => {
      if (task.id === taskId) {
        // Toggle the 'completed' field
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
  
    // Send a PUT request to update the JSON server with the updated tasks
    const response = await axios.put(`http://localhost:3001/tasks/${taskId}`, {
      completed: !state.tasks.find((task) => task.id === taskId).completed,
    });
  
    if (response.status === 200) {
      return updatedTasks;
    } else {
      throw new Error('Update failed');
    }
  });

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`http://localhost:3001/tasks/${taskId}`);
//   await axios.put(`http://localhost:5000/removeTask/${taskId}`);
  return taskId;
});

export const fetchCompletedTasks = createAsyncThunk('tasks/fetchCompletedTasks', async () => {
    const response = await axios.get('http://localhost:3001/tasks');
    const tasks = response.data;
    const completedTasks = tasks.filter((task) => task.completed === true);
    return completedTasks;
  });

  export const fetchPendingTasks = createAsyncThunk('tasks/fetchPendingTasks', async () => {
    const response = await axios.get('http://localhost:3001/tasks');
    const tasks = response.data;
    const pendingTasks = tasks.filter((task) => task.completed === false);
    return pendingTasks;
  });

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [],
    completedTasks: [],
    pendingTasks: [],
    filteredTasks: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.completedTasks = action.payload.filter((task) => task.completed === true);
        state.pendingTasks = action.payload.filter((task) => task.completed === false);
        state.filteredTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Similarly, add extraReducers for addTask, updateTask, and deleteTask.
  },
});

export default tasksSlice.reducer;