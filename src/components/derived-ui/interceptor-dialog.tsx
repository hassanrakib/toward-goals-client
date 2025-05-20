"use client";

import { useRouter } from "next/navigation";
import StyledDialog from "./styled-dialog";

export default function InterceptorDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    // on close => dialog will be closed as well as route will be updated back to the prev route
    <StyledDialog defaultOpen onExitComplete={() => router.back()}>
      {children}
    </StyledDialog>
  );
}
