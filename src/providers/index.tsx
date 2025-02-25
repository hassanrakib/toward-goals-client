import { Provider as ChakraUIProvider } from "@/components/ui/provider";
import { Provider as ReduxStoreProvider } from "@/redux/provider";
import { decrypt } from "@/services/auth";
import { cookies } from "next/headers";

export default async function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // if the user is authenticated the cookie will be found
  const cookie = (await cookies()).get("session")?.value;

  // decode the session
  const session = await decrypt(cookie);

  return (
    // don't use system preference use "light" theme by default
    <ChakraUIProvider enableSystem={false}>
      <ReduxStoreProvider session={session}>{children}</ReduxStoreProvider>
    </ChakraUIProvider>
  );
}
