import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";
import { getNewAccessTokenInTheCookie } from "../utils/getNewAccessToken";
import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseApi,
  prepareHeaders: async (headers) => {
    // if accessToken found in the cookie
    // send it with every request
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

// if accessToken is expired, we can generate a new accessToken using a valid refreshToken
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  // unauthorized status code
  const UNAUTHORIZED = 401;

  // get the result by calling the baseQuery function
  let baseQueryResult = await baseQuery(args, api, extraOptions);

  // if there is any sort of problem with the accessToken
  // we get to know it in the baseQueryResult
  if (baseQueryResult.error?.status === UNAUTHORIZED) {
    // get new accessToken using a valid refreshToken
    const newAccessTokenSetup = await getNewAccessTokenInTheCookie();

    if (newAccessTokenSetup?.success) {
      baseQueryResult = await baseQuery(args, api, extraOptions);
    }
  }

  return baseQueryResult;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});
