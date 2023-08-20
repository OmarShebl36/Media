import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './fetchUsers';
import axios from 'axios';

const removeUser = createAsyncThunk('user/remove', async (user: User) => {
  const response = await axios.delete(`http://localhost:3005/users/${user.id}`);

  return response.data;
});

export { removeUser };
