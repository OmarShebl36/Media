import { GoTrash } from 'react-icons/go';
import { Album } from '../types';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

interface Props {
  album: Album;
}

function AlbumsListItem({ album }: Props) {
  const handleDelete = (album: Album) => {
    console.log('album.id :>> ', album.id);
  };
  const header = (
    <div>
      <Button onClick={() => handleDelete}>
        <GoTrash />
      </Button>
      {album.title}
    </div>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album...
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
