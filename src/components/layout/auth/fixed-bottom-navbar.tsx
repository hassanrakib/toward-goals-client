import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { navItems } from "./sidebar-items";

// position fixed (relative to the viewport) always sticks to the bottom
// hidden from "lg" breakpoint
export default function FixedBottomNavbar() {
  return (
    <Flex
      as="nav"
      hideFrom="lg"
      position="fixed"
      zIndex="999"
      bottom="0"
      left="0"
      right="0"
      shadow="2xl"
      bgColor="bg"
      mx="2"
      mb="1"
      p="1"
      rounded="xl"
      justifyContent="space-around"
      alignItems="center"
      border="0.5px dashed"
      borderColor="yellow.400"
    >
      {navItems.map((item) => (
        <NextLink key={item.id} href={item.href}>
          <Flex direction="column" alignItems="center">
            <Box>
              <Icon size="lg">{item.icon}</Icon>
            </Box>
            <Text fontSize="xs" color="fg.muted">
              {item.name}
            </Text>
          </Flex>
        </NextLink>
      ))}
    </Flex>
  );
}
