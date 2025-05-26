"use client";
import ErrorUI from "@/components/shared/error-ui";
import { ErrorComponentProps } from "@/types/global";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error, reset }: ErrorComponentProps) {
  return <ErrorUI error={error} />;
}
