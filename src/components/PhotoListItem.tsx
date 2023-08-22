import { GoTrash } from 'react-icons/go';
import { Photo } from '../types';
import { useRemovePhotoMutation } from '../store';

interface Props {
  photo: Photo;
}

function PhotoListItem({ photo }: Props) {
  const [removePhoto] = useRemovePhotoMutation();
  const handleDeletePhoto = () => {
    removePhoto(photo);
  };
  return (
    <div className='relative cursor-pointer m-2'>
      <img
        className='h-20 w-20'
        src={photo.url}
        alt={`Random faker ${photo.id}`}
      />
      <div
        onClick={handleDeletePhoto}
        className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'
      >
        <GoTrash className='text-3xl'></GoTrash>
      </div>
    </div>
  );
}

export default PhotoListItem;
