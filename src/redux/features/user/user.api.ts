import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<IResponse<{ session: string }>, Partial<IUser>>({
      query: (user) => ({
        url: "/users/create-user",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
