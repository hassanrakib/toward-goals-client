import { Flex, Icon, Text } from "@chakra-ui/react";
import { CircleFadingArrowUp } from "lucide-react";
import Link from "next/link";

const TowardGoalsLogo = () => {
  return (
    <Link href="/">
      <Flex align="baseline" justify="center" gap={1} cursor="pointer">
        <Text fontSize="lg" fontWeight="bold">Toward Goals</Text>
        <Icon boxSize={7} color="yellow.400">
          <CircleFadingArrowUp />
        </Icon>
      </Flex>
    </Link>
  );
};

export default TowardGoalsLogo;
