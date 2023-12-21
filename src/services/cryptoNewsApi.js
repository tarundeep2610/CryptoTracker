import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  "X-RapidAPI-Key": "3d1661a5fcmsha9d8b948c2961c3p1da69ejsn6422dd3de303",
  "X-RapidAPI-Host": "news67.p.rapidapi.com",
};

const baseUrl = "https://news67.p.rapidapi.com/v2";

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNews",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => {
        if (newsCategory === "") {
          return createRequest(`/crypto?languages=en&batchSize=${count}`);
        }

        return createRequest(
          `/crypto?token=${newsCategory}&languages=en&batchSize=${count}`
        );
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
