import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, fetchUsers } from '../store';

function UsersList() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
   dispatch(fetchUsers()); 
  }, [dispatch]);

  return <div>UsersList</div>;
}

export default UsersList;
