import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

export function getHookFormError(
  errorObj: FieldErrors<FieldValues>,
  path: string
): FieldError | undefined {
  // Split the path into an array of keys
  const keys = path.split(".");

  // Traverse the error object using the keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = errorObj; // Use 'any' to allow dynamic property access

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      // If the path doesn't exist, return undefined
      return undefined;
    }
  }

  // Return the message if it exists
  return current;
}
