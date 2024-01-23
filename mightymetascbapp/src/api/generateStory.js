import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../constants/enums';

//console.log('BASE_URL >>', BASE_URL);

// Define a service using a base URL and expected endpoints
export const gameStoryApi = createApi({
  reducerPath: 'gamestorycreate',
  tagTypes: ['storycreate'],
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    // gamestore: builder.query({
    //   query: () => ({url: '/ask/'}),
    //   providesTags: ['storycreate'],
    // }),

    askQuery: builder.mutation({
      query: postData => ({
        url: '/ask/', //'/ask/',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['storycreate'],
    }),

    generateStory: builder.mutation({
      query: postData => ({
        url: '/generate_story/', //'/generate_story/',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['storycreate'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAskQueryMutation, useGenerateStoryMutation} = gameStoryApi;
