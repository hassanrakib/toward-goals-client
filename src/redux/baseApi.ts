import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";
import { refreshSession } from "../services/auth";
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
    // if session found in the cookie
    // send it with every request
    const session = (await cookies()).get("session")?.value;

    if (session) {
      headers.set("authorization", `Bearer ${session}`);
    }

    return headers;
  },
});

// if session is expired, we can generate a new session using a valid refreshToken
const baseQueryWithRefreshSession: BaseQueryFn<
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

  // if there is any sort of problem with the session
  // we get to know it in the baseQueryResult
  if (baseQueryResult.error?.status === UNAUTHORIZED) {
    // get new session using a valid refreshToken
    const newSession = await refreshSession();

    if (newSession) {
      baseQueryResult = await baseQuery(args, api, extraOptions);
    }
  }

  return baseQueryResult;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshSession,
    endpoints: () => ({}),
});
