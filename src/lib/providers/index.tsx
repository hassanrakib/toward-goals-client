import { Provider as ChakraUIProvider } from "@/components/ui/provider";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ChakraUIProvider>{children}</ChakraUIProvider>;
}
