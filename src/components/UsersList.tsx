import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, User, addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';

function UsersList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, error } = useSelector((state: any) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserAdded = () => {
    dispatch(addUser());
  };

  if (isLoading) {
    return <Skeleton times={6} className='h-10 w-full' />;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user: User) => {
    return (
      <div key={user.id} className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor-pointer'>
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button onClick={handleUserAdded}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
