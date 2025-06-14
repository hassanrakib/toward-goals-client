import { envConfig } from "@/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // get the session from redux store
      const session = (getState() as RootState).auth.session;

      // if session found attach session in the headers
      if (session) {
        headers.set("authorization", `Bearer ${session}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["myJoinedGoal", "habitOfAGoal", "subgoalOfAGoal", "timeSpanOfATask"],
});
