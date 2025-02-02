import { Provider as ChakraUIProvider } from "@/components/ui/provider";
import { Provider as ReduxStoreProvider } from "@/redux/provider";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // don't use system preference use "light" theme by default
    <ChakraUIProvider enableSystem={false}>
      <ReduxStoreProvider>{children}</ReduxStoreProvider>
    </ChakraUIProvider>
  );
}
