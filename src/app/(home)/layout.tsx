import { decrypt } from "@/utils/auth";
import { Container } from "@chakra-ui/react";
import { cookies } from "next/headers";

export default async function Layout({
  auth,
  guest,
  interceptor,
}: {
  auth: React.ReactNode;
  guest: React.ReactNode;
  interceptor: React.ReactNode;
}) {
  // if the user is authenticated the session will be found
  const session = (await cookies()).get("session")?.value;

  // optimistic check
  const sessionPayload = decrypt(session);

  // render slot based on the auth state
  return (
    // max width of the container is 90rem or 1440px by default
    <Container p={0}>
      {sessionPayload ? auth : guest}
      {interceptor}
    </Container>
  );
}
