import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type User = {
  id: number; name: string
}

interface Response {
  data: User[];
}

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response: Response = await axios.get('http://localhost:3005/users');

  // !! DEV ONLY!!!
  await pause(1000);

  return response.data;
});

// !! DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
