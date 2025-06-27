import { Center, Icon, Text } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";

const Footer = () => {
  return (
    <Center pb="6">
      <Text fontSize="sm" color="fg.muted">
        Made with{" "}
        <Icon size="lg" color="yellow.400">
          <HiHeart />
        </Icon>{" "}
        by Rakib Hassan
      </Text>
    </Center>
  );
};

export default Footer;
