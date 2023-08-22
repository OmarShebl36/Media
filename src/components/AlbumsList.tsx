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
  const [addAlbum] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) content = <Skeleton times={3} />;
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
      <div>
        Album for {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
