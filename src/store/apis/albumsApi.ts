import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, User } from '../../types';

// !! DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // !!Remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ['Album', 'UsersAlbums'],
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user: User) => {
          const tags = result.map((album: Album) => {
            return [{ type: 'Album', id: album.id }];
          });
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: (user: User) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user: User) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album: Album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;
export { albumsApi };
