import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseApi,
  prepareHeaders: async (headers) => {
    // if sessionToken found in the cookie
    // send it with every request
    // protected apis will need the Authorization header
    const sessionToken = (await cookies()).get("accessToken")?.value;

    if (sessionToken) {
      headers.set("Authorization", `Bearer ${sessionToken}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
