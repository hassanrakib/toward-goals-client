import StyledButton from "@/components/derived-ui/styled-button";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import { Card, Center, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <Center minH="100vh" bgColor="bg.subtle">
      <Card.Root variant="elevated" w="full" maxW="xs" rounded="xl">
        <Card.Header textAlign="center">
          {/* Logo */}
          <TowardGoalsLogo />
          {/* show a slogn */}
          <Text fontSize="xs" fontWeight="medium">
            Plan Bold. Track Smart. Achieve More.
          </Text>
        </Card.Header>
        <Card.Body>
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
