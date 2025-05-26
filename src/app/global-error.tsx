"use client";
import { ErrorComponentProps } from "@/types/global";
import { Text } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GlobalError({ error, reset }: ErrorComponentProps) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <Text color="fg.muted">{error.message}</Text>
      </body>
    </html>
  );
}
