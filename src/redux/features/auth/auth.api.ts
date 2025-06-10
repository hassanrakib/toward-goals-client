import { baseApi } from "@/redux/baseApi";
import { ILoginCredentials } from "../../../types/auth";
import { IResponse } from "@/types/global";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<IResponse<{ session: string }>, ILoginCredentials>({
      query: (loginCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
