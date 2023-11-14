// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter:'all',
  search:'',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskSuccess: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilter:(state, action)=> {
      state.filter = action.payload;
    },
    setSearch:(state, action)=>{
      state.search = action.payload;
    },

  },
});

export const { addTask, updateTaskSuccess , setTasks, setLoading, setError, setFilter,setSearch } = taskSlice.actions;

export const selectFilteredTasks = (state) =>{
  const{tasks, filter, search} = state.task;
  return tasks.filter ((task) =>{

    const isStatusMatch = filter === 'all' || task.status === filter;
    const isSearchMatch =  
    task.title.toLowerCase().include(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase());
    return isStatusMatch && isSearchMatch;

  } )
};

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get('http://localhost:3001/task'); // Adjust the API endpoint accordingly
    dispatch(setTasks(response.data));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    dispatch(setError(error.message || 'Error fetching tasks'));
  }
};

export const postTask = (taskData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post('http://localhost:3001/task', taskData); // Adjust the API endpoint accordingly
    dispatch(addTask(response.data));
  } catch (error) {
    console.error('Error adding task:', error);
    dispatch(setError(error.message || 'Error adding task'));
  }
};

export const updateTask = ({id, updatedTask }) => async (dispatch) => {
  console.log("why",updatedTask);
  console.log("id",id)
  try { 
    dispatch(setLoading());
    const response = await axios.put(`http://localhost:3001/task/${id}`, updatedTask);
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    console.error('Error updating task:', error);
    dispatch(setError(error.message || 'Error updating task'));
  }
};

export const updateTaskStatus = ({ id, status }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.put(`http://localhost:3001/task/${id}/status`, { status });
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    console.error('Error updating task status:', error);
    dispatch(setError(error.message || 'Error updating task status'));
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.delete(`http://localhost:3001/task/${id}`);
    dispatch({ type: 'task/deleteTask', payload: id });
  } catch (error) {
    console.error('Error deleting task:', error);
    dispatch(setError(error.message || 'Error deleting task'));
  }
};

export default taskSlice.reducer;
