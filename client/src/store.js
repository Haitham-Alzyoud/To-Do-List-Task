import { configureStore } from '@reduxjs/toolkit';
import RegisterSlice from './Redux/RegisterSlice';
import LoginSlice from './Redux/LoginSlice';
import TaskFormSlice from './Redux/TaskFormSlice';
import TaskListSlice from './Redux/TaskListSlice';

const store = configureStore({
    reducer: {
        login: LoginSlice,
        register: RegisterSlice,

        taskForm: TaskFormSlice ,
        task: TaskListSlice,
    },
  });
  
  export default store;