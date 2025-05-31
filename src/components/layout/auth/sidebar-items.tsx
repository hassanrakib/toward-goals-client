import { Flex, Text, Icon, VStack } from "@chakra-ui/react";
import { FerrisWheel, Goal, ListTodo, SquareCheck, Target } from "lucide-react";
import Link from "next/link";

interface ISidebarItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const SidebarItem = ({ name, icon, href }: ISidebarItemProps) => {
  return (
    <Link href={href}>
      <Flex
        align="center"
        gap={3}
        p={1.5}
        rounded="xl"
        _hover={{ bg: "bg.muted" }}
      >
        {/* Small Icon */}
        <Icon boxSize={5}>{icon}</Icon>

        {/* Text */}
        <Text fontSize="md" color="fg.muted">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

const SidebarItems = () => {
  // Sample data for sidebar items
  const items = [
    { id: 1, name: "Goals", icon: <Goal />, href: "/goals" },
    { id: 2, name: "Subgoals", icon: <Target />, href: "/subgoals" },
    { id: 3, name: "Habits", icon: <FerrisWheel />, href: "/habits" },
    { id: 4, name: "My Tasks", icon: <SquareCheck />, href: "/tasks" },
    { id: 5, name: "Tasks Feed", icon: <ListTodo />, href: "/feed" },
  ];

  return (
    <VStack gap={2} align="stretch">
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          name={item.name}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </VStack>
  );
};

export default SidebarItems;
