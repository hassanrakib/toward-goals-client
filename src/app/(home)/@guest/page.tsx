import StyledButton from "@/components/derived-ui/styled-button";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import { Card, Center, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <Center minH="100vh" bgColor="bg.subtle">
      <Card.Root variant="elevated" w="full" maxW="xs">
        <Card.Body>
          {/* Logo */}
          <Center mb={8}>
            <TowardGoalsLogo />
          </Center>

          {/* Buttons */}
          <Stack direction="row" justifyContent="center" spaceX={4}>
            <StyledButton asChild>
              <Link href="/signin">Sign In</Link>
            </StyledButton>
            <StyledButton variant="outline" asChild>
              <Link href="/signup">Sign Up</Link>
            </StyledButton>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
