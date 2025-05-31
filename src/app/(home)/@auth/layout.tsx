import { Grid, GridItem } from "@chakra-ui/react";
import TopNavbar from "@/components/layout/auth/top-navbar";
import Sidebar from "@/components/layout/auth/sidebar";
import FixedBottomNavbar from "@/components/layout/auth/fixed-bottom-navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1 column from base to below md breakpoint
    // from md breakpoint to above 2 columns (one for sidebar another for main content)
    <Grid templateColumns={{ base: "1fr", md: "220px 1fr" }}>
      {/* Sidebar (Sticky) shown from md breakpoint */}
      <Sidebar />
      {/* fixed (relative to the viewport) navbar to the bottom shown before md breakpoint */}
      <FixedBottomNavbar />

      {/* Grid Layout for Navbar + Main Content */}
      <Grid
        templateRows="50px 1fr"
        minH="100dvh"
        gap={4}
        p={4}
        // from base to before md breakpoint pb is 60px = bottom navbar height + 16px
        pb={{ base: "60px", md: 4 }}
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
