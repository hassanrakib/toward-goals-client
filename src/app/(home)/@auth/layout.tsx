import {
  Grid,
  GridItem,
  Box,
  Flex,
  IconButton,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { BellIcon } from "lucide-react";
import SidebarItems from "@/components/layout/auth/sidebar-items";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container position="relative" bgColor="bg.subtle" p={0}>
      {/* Sidebar (Fixed) */}
      <Box
        as="aside"
        p={3}
        pt={5}
        width="220px"
        bgColor="bg"
        boxShadow="xs"
        borderRadius="3xl"
        position="fixed"
        left={4}
        top={4}
        bottom={4}
      >
        <VStack gap={8} align="stretch">
          {/* Toward Goals Logo */}
          <TowardGoalsLogo />
          {/* Sidebar Items */}
          <SidebarItems />
        </VStack>
      </Box>

      {/* Grid Layout for Navbar + Main Content */}
      <Grid
        templateRows="50px 1fr"
        minH="100dvh"
        gap={4}
        p={4}
        // Offsets content so that it doesn't go under the sidebar
        // sidebar width + left prop value
        ml="236px"
      >
        {/* Top Navbar */}
        <GridItem
          as="header"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          px={4}
          borderRadius="3xl"
        >
          {/* Notification Icon & Avatar */}
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Notifications"
              variant="ghost"
              rounded="full"
            >
              <BellIcon />
            </IconButton>
            <Avatar name="User" cursor="pointer" />
          </Flex>
        </GridItem>

        {/* Main Content */}
        <GridItem as="main">{children}</GridItem>
      </Grid>
    </Container>
  );
}
