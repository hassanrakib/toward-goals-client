import { baseApi } from "@/redux/baseApi";
import { ISessionPayload } from "@/types/auth";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<IResponse<ISessionPayload>, Partial<IUser>>({
      query: (user) => ({
        url: "/users/create-user",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
