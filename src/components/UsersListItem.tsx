import { useThunk } from '../hooks/use-thunk';
import { GoTrash } from 'react-icons/go';
import { User, deleteUser } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

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

  const header = (
    <>
      <Button
        className='mr-3'
        loading={isLoading as boolean}
        onClick={() => handleClick()}
      >
        <GoTrash />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );
  return <ExpandablePanel header={header}>Content</ExpandablePanel>;
}

export default UsersListItem;
