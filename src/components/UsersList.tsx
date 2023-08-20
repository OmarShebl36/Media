import { User, addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useThunk } from '../hooks/use-thunk';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state: any) => {
    return state.users;
  });

  if (
    typeof doCreateUser !== 'function' ||
    typeof doFetchUsers !== 'function'
  ) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdded = () => {
    doCreateUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className='h-10 w-full' />;
  }

  if (loadingUsersError) {
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
        {isCreatingUser ? (
          'Creating User...'
        ) : (
          <Button onClick={handleUserAdded}>+ Add User</Button>
        )}
        {creatingUserError && 'Error creating user...'}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
