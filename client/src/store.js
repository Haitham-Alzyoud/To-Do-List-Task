import { configureStore } from '@reduxjs/toolkit';
import RegisterSlice from './Redux/RegisterSlice';
import LoginSlice from './Redux/LoginSlice';
import tasksReducer from './Redux/TaskSlice';
const store = configureStore({
    reducer: {
        login: LoginSlice,
        register: RegisterSlice,

        tasks: tasksReducer,
    },
  });
  
  export default store;