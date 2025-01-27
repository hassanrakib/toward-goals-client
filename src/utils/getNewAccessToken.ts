import { envConfig } from "@/config/envConfig";
import Response from "@/types/response";

export const getNewAccessTokenInTheCookie = async () => {
  try {
    const response = await fetch(`${envConfig.baseApi}/refresh-token`, {
      // send all the tokens including refresh token
      // to get a fresh accessToken in the cookie
      credentials: "include",
    });

    const result: Response<{ accessToken: string }> = await response.json();

    return result;
  } catch (error: unknown) {
    console.error((error as Error).message);
  }
};
