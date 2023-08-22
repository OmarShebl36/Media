import { GoTrash } from 'react-icons/go';
import { Album } from '../types';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useDeleteAlbumMutation } from '../store';

interface Props {
  album: Album;
}

function AlbumsListItem({ album }: Props) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleDelete = () => {
    deleteAlbum(album);
  };

  const header = (
    // use fragment instead of div to apply the styles of ExpandablePanel
    <>
      <Button loading={results.isLoading} onClick={handleDelete}>
        <GoTrash />
      </Button>
      {album.title}
    </>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album...
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
