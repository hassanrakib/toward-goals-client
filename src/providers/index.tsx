import { Provider as ChakraUIProvider } from "@/components/ui/provider";
import { Provider as ReduxStoreProvider } from "@/redux/provider";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ChakraUIProvider>
      <ReduxStoreProvider>{children}</ReduxStoreProvider>
    </ChakraUIProvider>
  );
}
