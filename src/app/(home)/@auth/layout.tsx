import {
  Grid,
  GridItem,
  Box,
  Flex,
  IconButton,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { BellIcon, Circle, CircleArrowOutUpRight, CircleDashed, CircleDot, CircleDotDashed, FlagTriangleRight } from "lucide-react";
import SidebarItems from "@/components/layout/sidebar-items";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Sidebar (Fixed) */}
      <Box
        as="aside"
        pl={4}
        pt={8}
        width="220px"
        bgGradient="to-r"
        gradientFrom="bg.muted"
        gradientTo="bg"
        position="fixed"
        left={0}
        top={0}
        bottom={0}
      >
        <VStack align="stretch" gap={5}>
          {/* Toward Goals Logo */}
          <Flex align="center" gap={2} cursor="pointer">
            <Icon boxSize={7} color="red">
            <Circle />
            </Icon>
            <Text
              fontSize="lg"
              fontWeight={300}
              color="red"
              letterSpacing="widest"
              textDecoration="underline"
            >
              Toward Goals
            </Text>
          </Flex>
          <SidebarItems />
        </VStack>
      </Box>

      {/* Grid Layout for Navbar + Main Content */}
      <Grid
        templateRows="60px 1fr"
        height="100vh"
        gap={3}
        p={2}
        // Offsets content so it doesn't go under the sidebar
        ml="220px"
      >
        {/* Top Navbar */}
        <GridItem as="header" display="flex" justifyContent="flex-end">
          {/* Notification Icon & Avatar */}
          <Flex align="center" gap={4}>
            <IconButton aria-label="Notifications" variant="ghost">
              <BellIcon />
            </IconButton>
            <Avatar name="User" />
          </Flex>
        </GridItem>

        {/* Main Content */}
        <GridItem as="main">{children}</GridItem>
      </Grid>
    </>
  );
}
