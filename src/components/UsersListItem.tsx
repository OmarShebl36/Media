import { User } from '../store';

interface Props {
  user: User;
}

function UsersListItem({ user }: Props) {
  return (
    <div className='mb-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        {user.name}
      </div>
    </div>
  );
}

export default UsersListItem;
