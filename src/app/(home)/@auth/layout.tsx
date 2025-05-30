import { Grid, GridItem, Box, VStack, Container } from "@chakra-ui/react";
import SidebarItems from "@/components/layout/auth/sidebar-items";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import TopNavbar from "@/components/layout/auth/top-navbar";

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
        <TopNavbar />

        {/* Main Content */}
        {/* min height is set by subtracting ((16 + 16)px padding to the top & bottom + 50px header navbar + 16px gap below the navbar) */}
        <GridItem as="main" minH="calc(100dvh - 98px)">
          {children}
        </GridItem>
      </Grid>
    </Container>
  );
}
