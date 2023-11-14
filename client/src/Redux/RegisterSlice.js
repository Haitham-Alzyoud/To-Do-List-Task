import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, registerFailure } = registerSlice.actions;

// Async action using Redux Thunk
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/users', userData);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.response.data));
  }
};

export const selectRegisteredUser = (state) => state.register.user;
export const selectRegistrationError = (state) => state.register.error;

export default registerSlice.reducer;
