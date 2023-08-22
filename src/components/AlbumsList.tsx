import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import { Album, User } from '../types';
import AlbumsListItem from './AlbumsListItem';
import Button from './Button';
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
      return <AlbumsListItem key={album.id} album={album} />;
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
