import { Flex, Text, Icon, VStack } from "@chakra-ui/react";
import {
  CalendarSync,
  Goal,
  Logs,
  SquareCheck,
  Target,
} from "lucide-react";

interface ISidebarItemProps {
  name: string;
  icon: React.ReactNode;
}

const SidebarItem = ({ name, icon }: ISidebarItemProps) => {
  return (
    <Flex
      align="center"
      gap={3}
      p={1.5}
      rounded="xl"
      cursor="pointer"
      _hover={{ bg: "bg.muted" }}
    >
      {/* Small Icon */}
      <Icon boxSize={6} color="fg.muted">
        {icon}
      </Icon>

      {/* Text */}
      <Text fontSize="md" fontWeight={200}>
        {name}
      </Text>
    </Flex>
  );
};

const SidebarItems = () => {
  // Sample data for sidebar items
  const items = [
    { id: 1, name: "Goals", icon: <Goal /> },
    { id: 2, name: "Subgoals", icon: <Target /> },
    { id: 3, name: "Habits", icon: <CalendarSync /> },
    { id: 4, name: "My Tasks", icon: <SquareCheck /> },
    { id: 5, name: "Tasks Feed", icon: <Logs /> },
  ];

  return (
    <VStack gap={2} align="stretch">
      {items.map((item) => (
        <SidebarItem key={item.id} name={item.name} icon={item.icon} />
      ))}
    </VStack>
  );
};

export default SidebarItems;
