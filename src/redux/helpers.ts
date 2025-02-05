import { IResponse } from "@/types/global";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryErrorWithData(
  error: unknown
): error is FetchBaseQueryError & { data: IResponse<undefined> } {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    "data" in error
  );
}
