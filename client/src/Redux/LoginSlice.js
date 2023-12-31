import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/login', userData);
    localStorage.setItem("token", response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    if(error.response.status === 400 && error.response.data.error === 'Email not founf'){
      dispatch(loginFailure('Email not foound'))
    }
    dispatch(loginFailure(error.response.data));
  }
};

export const selectUser = (state) => state.login.user;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
