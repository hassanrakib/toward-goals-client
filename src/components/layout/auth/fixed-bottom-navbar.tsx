import { Flex, Icon } from "@chakra-ui/react";
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
  { id: 1, icon: <Goal />, href: "/goals" },
  { id: 2, icon: <Target />, href: "/subgoals" },
  { id: 0, icon: <CircleFadingArrowUp />, href: "/" },
  { id: 3, icon: <FerrisWheel />, href: "/habits" },
  { id: 4, icon: <SquareCheck />, href: "/tasks" },
];

// position fixed (relative to the viewport) always sticks to the bottom
//   hidden from "md" breakpoint
export default function FixedBottomNavbar() {
  return (
    <Flex
      as="nav"
      hideFrom="md"
      position="fixed"
      zIndex="2"
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
          <Icon size="xl" color={item.href !== "/" ? "current" : "yellow.500"}>
            {item.icon}
          </Icon>
        </NextLink>
      ))}
    </Flex>
  );
}
