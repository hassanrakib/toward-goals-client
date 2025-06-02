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
    // 1 column from base to below lg breakpoint
    // from lg breakpoint to above 2 columns (one for sidebar another for main content)
    <Grid templateColumns={{ base: "1fr", lg: "220px 1fr" }}>
      {/* Sidebar (Sticky) shown from lg breakpoint */}
      <Sidebar />
      {/* fixed (relative to the viewport) navbar to the bottom shown before lg breakpoint */}
      <FixedBottomNavbar />

      {/* Grid Layout for Navbar + Main Content */}
      <Grid
        templateRows="50px 1fr"
        minH="100dvh"
        gap={4}
        pt={4}
        // from base to before lg breakpoint pb is 78px = bottom navbar height + 16px
        pb={{ base: "78px", lg: 4 }}
        // base to before md, padding left & right is minimal to give much more space
        px={{ base: 3, md: 4 }}
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
