import { decrypt } from "@/services/auth";
import { cookies } from "next/headers";

export default async function Layout({
  auth,
  guest,
}: {
  auth: React.ReactNode;
  guest: React.ReactNode;
}) {
  // if the user is authenticated the cookie will be found
  const cookie = (await cookies()).get("session")?.value;

  // optimistic check
  const session = await decrypt(cookie);

  // render slot based on the auth state
  return session ? auth : guest;
}
