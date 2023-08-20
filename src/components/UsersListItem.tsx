import { useThunk } from '../hooks/use-thunk';
import { GoTrash } from 'react-icons/go';
import { User, deleteUser } from '../store';
import Button from './Button';

interface Props {
  user: User;
}

function UsersListItem({ user }: Props) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  if (typeof doDeleteUser !== 'function') {
    return null;
  }

  const handleClick = () => {
    doDeleteUser(user);
  };

  return (
    <div className='mb-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        <div className='flex flex-row items-center justify-between'>
          <Button className="mr-3" loading={isLoading as boolean} onClick={() => handleClick()}>
            <GoTrash />
          </Button>
          {error && <div>Error deleting user.</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
}

export default UsersListItem;
