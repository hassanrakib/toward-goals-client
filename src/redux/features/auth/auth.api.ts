import { baseApi } from "@/redux/baseApi";
import { ILoginCredentials, ISessionPayload } from "../../../types/auth";
import { IResponse } from "@/types/global";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<IResponse<ISessionPayload>, ILoginCredentials>({
      query: (loginCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
