import { envConfig } from "@/config/envConfig";
import { IResponse, QueryParams } from "@/types/global";
import { cookies } from "next/headers";

export interface FetchOptions extends RequestInit {
  queryParams?: QueryParams;
}

// function to fetch data in the server components
export async function fetchFromApi<T>(
  endPoint: string,
  options: FetchOptions = {}
): Promise<IResponse<T>> {
  // destructure options
  const { queryParams, headers, ...restOptions } = options;

  // construct the query string if queryParams not undefined
  const queryString = queryParams
    ? // URLSearchParams constructor takes an object of type Record<string, string>
      `?${new URLSearchParams(
        // create an array of type [string, string| undefined][]
        // to remove all the properties with undefined value
        Object.entries(queryParams).reduce(
          (record, [key, value]) => {
            // if value is not undefined
            if (value) {
              // assign the property to the record and convert the value to string
              record[key] = String(value);
            }

            // return record after every iteration
            return record;
          },
          // initial value for record
          {} as Record<string, string>
        )
      ).toString()}`
    : "";

  // get the session from the cookie store
  const session = (await cookies()).get("session")?.value;

  try {
    // get response
    const res = await fetch(`${envConfig.baseApi}${endPoint}${queryString}`, {
      headers: {
        // send the authorization headers if session found
        ...(session ? { authorization: `Bearer ${session}` } : {}),
        ...headers,
      },
      ...restOptions,
    });

    const data: IResponse<T> = await res.json();

    // if error response sent from the remote server
    // get the error message and throw a new error
    // error thrown from here will be caught by the catch block
    if (!data.data) {
      throw new Error(data.message);
    }

    // return the resolved data
    return data;

    // the catch block handles error thrown explicitly from the try block
    // also if network issue happens promise gets rejected
  } catch (err) {
    // throw error to let the next.js error boundary to take care of it
    // and show a meaningful ui
    throw err;
  }
}
