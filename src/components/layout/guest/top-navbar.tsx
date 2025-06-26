import StyledButton from "@/components/derived-ui/styled-button";
import StyledDialog from "@/components/derived-ui/styled-dialog";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import { Card, Flex, IconButton } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function TopNavbar() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="full"
      maxW="4xl"
      mx="auto"
    >
      {/* logo */}
      <TowardGoalsLogo />
      {/* icon to show links within a dialog below sm breakpoint */}
      <StyledDialog
        size="full"
        placement="top"
        triggerElement={
          <IconButton
            hideFrom="sm"
            size="xs"
            variant="outline"
            color="yellow.600"
          >
            <Menu />
          </IconButton>
        }
      >
        {/* show links to signup signin */}
        <Card.Root height="100dvh">
          <Card.Body mt="2" gap="2">
            <StyledButton asChild>
              <Link href="/signin">Sign In</Link>
            </StyledButton>
            <StyledButton variant="outline" asChild>
              <Link href="/signup">Sign Up</Link>
            </StyledButton>
          </Card.Body>
        </Card.Root>
      </StyledDialog>
      {/* links to show above sm breakpoint */}
      <Flex gap="3" hideBelow="sm">
        <StyledButton asChild>
          <Link href="/signin">Sign In</Link>
        </StyledButton>
        <StyledButton variant="outline" asChild>
          <Link href="/signup">Sign Up</Link>
        </StyledButton>
      </Flex>
    </Flex>
  );
}
