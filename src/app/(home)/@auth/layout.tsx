import { Grid, GridItem, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { BellIcon } from "lucide-react";
import SidebarItems from "@/components/layout/sidebar-items";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Sidebar (Fixed) */}
      <Box
        as="aside"
        bg="gray.100"
        rounded="2xl"
        p={4}
        width="250px"
        position="fixed"
        left={4}
        top={4}
        bottom={4}
      >
        <SidebarItems />
      </Box>

      {/* Grid Layout for Navbar + Main Content */}
      <Grid
        templateRows="60px 1fr"
        height="100vh"
        gap={4}
        p={4}
        // Offsets content so it doesn't go under the sidebar
        // sidebar width + left prop value
        ml="266px"
      >
        {/* Top Navbar */}
        <GridItem
          as="header"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="lg"
        >
          {/* Left: Logo */}
          <Text fontSize="xl" fontWeight="bold">
            App Logo
          </Text>

          {/* Right: Notification Icon & Avatar */}
          <Flex align="center" gap={4}>
            <IconButton aria-label="Notifications" variant="ghost">
              <BellIcon />
            </IconButton>
            <Avatar name="User" />
          </Flex>
        </GridItem>

        {/* Main Content */}
        <GridItem as="main" bg="gray.50" p={4} borderRadius="lg">
          {children}
        </GridItem>
      </Grid>
    </>
  );
}
