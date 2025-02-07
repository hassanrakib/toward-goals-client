import { Flex, Text, Icon, Box, VStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "../ui/avatar";

interface ISidebarItemProps {
  name: string;
  img: string;
}

const SidebarItem = ({ name, img }: ISidebarItemProps) => {
  return (
    <Flex
      align="center"
      gap={3}
      p={1}
      borderWidth="1px"
      rounded="xl"
      cursor="pointer"
      _hover={{ bg: "gray.600" }}
    >
      {/* Small Avatar */}
      <Avatar size="xs" src={img} />

      {/* Text */}
      <Text fontSize="md" fontWeight="medium">
        {name}
      </Text>

      {/* Down Arrow Icon */}
      <Box ml="auto">
        <Icon boxSize={3.5}>
          <ChevronDown />
        </Icon>
      </Box>
    </Flex>
  );
};

const SidebarItems = () => {
  // Sample data for sidebar items
  const items = [
    { id: 1, text: "Dashboard", img: "https://via.placeholder.com/40" },
    { id: 2, text: "Profile", img: "https://via.placeholder.com/40" },
    { id: 3, text: "Settings", img: "https://via.placeholder.com/40" },
  ];

  return (
    <VStack gap={3} align="stretch">
      {items.map((item) => (
        <SidebarItem key={item.id} name={item.text} img={item.img} />
      ))}
    </VStack>
  );
};

export default SidebarItems;
