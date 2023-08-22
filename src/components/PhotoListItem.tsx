import { Photo } from '../types';

interface Props {
    photo: Photo;
}

function PhotoListItem({photo}: Props) {
    return ( <>{photo.url}</> );
}

export default PhotoListItem;