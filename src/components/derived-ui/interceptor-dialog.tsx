"use client";

import { useRouter } from "next/navigation";
import StyledDialog from "./styled-dialog";
import { useRef } from "react";

export default function InterceptorDialog({
  children,
}: {
  children: (
    dialogContentRef: React.RefObject<HTMLDivElement>
  ) => React.ReactNode;
}) {
  // router from next/navigation
  const router = useRouter();

  // children is a function required to send dialogContentRef
  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    // on close => dialog will be closed as well as route will be updated back to the prev route
    <StyledDialog
      defaultOpen
      onExitComplete={() => router.back()}
      ref={dialogContentRef}
    >
      {children(dialogContentRef as React.RefObject<HTMLDivElement>)}
    </StyledDialog>
  );
}
