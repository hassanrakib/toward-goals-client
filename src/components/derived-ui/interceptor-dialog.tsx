"use client";

import { useRouter } from "next/navigation";
import StyledDialog from "./styled-dialog";
import { Dialog } from "@chakra-ui/react";

export default function InterceptorDialog({
  size,
  ref,
  children,
}: {
  size?: Dialog.RootProps["size"];
  ref?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  // router from next/navigation
  const router = useRouter();

  return (
    // on close => dialog will be closed as well as route will be updated back to the prev route
    <StyledDialog
      defaultOpen
      onExitComplete={() => router.back()}
      size={size}
      ref={ref}
    >
      {children}
    </StyledDialog>
  );
}
