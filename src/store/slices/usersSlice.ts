import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';

interface InitialValues {
  data: {id: number, name: string}[];
  isLoading: boolean;
  error: SerializedError | null;
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  } as InitialValues,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;