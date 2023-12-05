import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders = {
    'X-Api-Key': 'd08233df855c4f668ff7dc37599e3e60'
}

const baseUrl= 'https://newsapi.org/v2';

const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi ({
    reducerPath: 'cryptoNews',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory,count}) =>  createRequest(`/everything?q=${newsCategory}&pageSize=${count}`)})
    })
})

export const{
    useGetCryptoNewsQuery
} = cryptoNewsApi; 
