import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './fetchUsers';
import axios from 'axios';

const deleteUser = createAsyncThunk('user/remove', async (user: User) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  return user;
});

export { deleteUser };
