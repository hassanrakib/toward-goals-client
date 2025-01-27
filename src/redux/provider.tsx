"use client";

import { useRef } from "react";
import { Provider as StoreProvider } from "react-redux";
import { AppStore, makeStore } from "./store";

export function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
}
