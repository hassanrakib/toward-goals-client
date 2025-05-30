import { Grid, GridItem, Box, VStack } from "@chakra-ui/react";
import SidebarItems from "@/components/layout/auth/sidebar-items";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import TopNavbar from "@/components/layout/auth/top-navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid templateColumns="220px 1fr">
      {/* Sidebar (Sticky) */}
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
      >
        {/* Top Navbar */}
        <TopNavbar />

        {/* Main Content */}
        {/* min height is set by subtracting ((16 + 16)px padding to the top & bottom + 50px header navbar + 16px gap below the navbar) */}
        <GridItem as="main" minH="calc(100dvh - 98px)">
          {children}
        </GridItem>
      </Grid>
    </Grid>
  );
}
