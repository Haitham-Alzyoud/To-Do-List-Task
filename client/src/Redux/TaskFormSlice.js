// taskFormSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { postTask } from '../Redux/TaskListSlice';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  priority:'',
  status:'',
  id: '',
};

const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      switch (field) {
        case 'title':
        case 'description':
        case 'dueDate':
        case 'priority':
        case 'status':
          state[field] = value;
          break;
        default:
          break;
      }
    },
    clearFormFields: (state) => {
      return initialState;
    },
  },
});

// Async action using Axios without thunk
export const sendFormData = (formData) => async (dispatch) => {
  try {
    // Send the form data to the API
    await axios.post('http://localhost:3001/task', formData); // Adjust the API endpoint accordingly
    dispatch(postTask(formData)); // Update the state with the new task
    dispatch(taskFormSlice.actions.clearFormFields()); // Clear the form state
    console.log('Data sent successfully');
  } catch (error) {
    console.error('Error sending data:', error);
    // Handle error if needed
  }
};

export const { setField, clearFormFields } = taskFormSlice.actions;
export const selectTaskForm = (state) => state.taskForm;

export default taskFormSlice.reducer;
