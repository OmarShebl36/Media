import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { Album, Photo } from '../../types';

// !! DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // !!Remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ['Photo', 'AlbumsPhotos'],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album: Album) => {
          const tags = result.map((photo: Photo) => {
            return { type: 'Photo', id: photo.id };
          });
          tags.push({ type: 'AlbumsPhotos', id: album.id });
          return tags;
        },
        query: (album: Album) => {
          return {
            url: '/photos',
            params: { albumId: album.id },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album: Album) => {
          return [
            {
              type: 'AlbumsPhotos',
              id: album.id,
            },
          ];
        },
        query: (album: Album) => {
          return {
            url: '/photos',
            body: {
              albumId: album.id,
            },
            method: 'POST',
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo: Photo) => {
          return [
            {
              type: 'Photo',
              id: photo.id,
            },
          ];
        },
        query: (photo: Photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi;
export { photosApi };
