import { addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';
import { User } from '../types';

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

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  let content: JSX.Element;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className='h-10 w-full' />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user: User) => {
      return <UsersListItem key={user.id} user={user} />
    });
  }

  return (
    <>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser as boolean} onClick={handleUserAdded}>
          + Add User
        </Button>
        {creatingUserError && 'Error creating user...'}
      </div>
      {content}
    </>
  );
}

export default UsersList;
