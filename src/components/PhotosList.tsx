import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import { Album, Photo } from '../types';
import Button from './Button';
import PhotoListItem from './PhotoListItem';
import Skeleton from './Skeleton';

interface Props {
  album: Album;
}

function PhotosList({ album }: Props) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) content = <Skeleton times={3} className='h-8 w-8' />;
  else if (error) content = <div>Error fetching photos...</div>;
  else {
    content = data.map((photo: Photo) => {
        return <PhotoListItem key={photo.id} photo={photo} />;
      });
  }

  return (
    <>
        <div className='m-2 flex flex-row justify-between items-center'>
          <h3 className='text-lg font-bold'>Photos In {album.title}</h3>
          <Button isLoading={results.isLoading} onClick={handleAddPhoto}>
            + Add Photo
          </Button>
        </div>
        <div className='mx-8 flex flex-row flex-wrap justify-center'>
            {content}
        </div>
    </>
  );
}

export default PhotosList;
