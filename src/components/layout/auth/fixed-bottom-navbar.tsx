import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import {
  CircleFadingArrowUp,
  FerrisWheel,
  Goal,
  SquareCheck,
  Target,
} from "lucide-react";

// Sample data for nav items
const navItems = [
  { id: 1, name: "Goals", icon: <Goal />, href: "/goals" },
  { id: 2, name: "Subgoals", icon: <Target />, href: "/subgoals" },
  { id: 0, name: "Home", icon: <CircleFadingArrowUp />, href: "/" },
  { id: 3, name: "Habits", icon: <FerrisWheel />, href: "/habits" },
  { id: 4, name: "Tasks", icon: <SquareCheck />, href: "/tasks" },
];

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
      shadow="xl"
      bgColor="bg"
      mx="2"
      mb="1"
      p="1.5"
      rounded="2xl"
      justifyContent="space-around"
      alignItems="center"
    >
      {navItems.map((item) => (
        <NextLink key={item.id} href={item.href}>
          <Flex direction="column" alignItems='center'>
            <Box>
              <Icon
                size="xl"
                color={item.href !== "/" ? "current" : "yellow.500"}
              >
                {item.icon}
              </Icon>
            </Box>
            <Text fontSize="xs" color="fg.muted" hideBelow="md">{item.name}</Text>
          </Flex>
        </NextLink>
      ))}
    </Flex>
  );
}
