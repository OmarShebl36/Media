import { Photo } from '../types';

interface Props {
  photo: Photo;
}

function PhotoListItem({ photo }: Props) {
  return (
    <div className='relative m-2'>
      <img
        className='h-20 w-20'
        src={photo.url}
        alt={`Random faker ${photo.id}`}
      />
    </div>
  );
}

export default PhotoListItem;
