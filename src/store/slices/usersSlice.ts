import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
});

export const usersReducer = usersSlice.reducer;