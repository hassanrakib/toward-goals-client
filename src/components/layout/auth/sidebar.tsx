import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import { Box, VStack } from "@chakra-ui/react";
import SidebarItems from "./sidebar-items";

export default function Sidebar() {
  return (
    <Box
      as="aside"
      p={3}
      mb={4}
      ml={4}
      bgColor="bg"
      boxShadow="xs"
      borderRadius="3xl"
      // min height of this box is 100dvh because other grid item in the same row
      // is assigned min height of 100dvh
      // and height will increase as height of other grid item increases
      // also height will increase when margin given to the bottom
      // subtract mb={4} & top={4}
      maxHeight="calc(100dvh - 32px)"
      position="sticky"
      top={4}
      // hidden below md breakpoint
      // as grid container template columns set to '1fr only' before md breakpoint
      hideBelow="md"
    >
      <VStack gap={8} align="stretch">
        {/* Toward Goals Logo */}
        <TowardGoalsLogo />
        {/* Sidebar Items */}
        <SidebarItems />
      </VStack>
    </Box>
  );
}
