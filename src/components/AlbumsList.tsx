import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import { Album, User } from '../types';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';

interface Props {
  user: User;
}

function AlbumsList({ user }: Props) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) content = <Skeleton times={3} className='h-10 w-full'/>;
  else if (error) content = <div>Error loading albums.</div>;
  else {
    content = data.map((album: Album) => {
      const header = <div>{album.title}</div>;

      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album...
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className='m-2 flex flex-row justify-between items-center'>
        <h3 className='text-lg font-bold'>Album for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
