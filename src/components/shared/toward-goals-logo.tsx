import {
  Flex,
  Icon,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { CircleFadingArrowUp } from "lucide-react";
import NavLink from "next/link";

const TowardGoalsLogo = (props: Omit<ChakraLinkProps, "href">) => {
  return (
    <ChakraLink asChild _hover={{textDecor: "none"}} _focus={{outline: "none"}} display="flex" justifyContent="center" {...props}>
      <NavLink href="/">
        <Flex alignItems="baseline" cursor="pointer">
          <Text fontSize="lg" fontWeight="bold">
            Toward Goals
          </Text>
          <Icon boxSize={7} color="yellow.400">
            <CircleFadingArrowUp />
          </Icon>
        </Flex>
      </NavLink>
    </ChakraLink>
  );
};

export default TowardGoalsLogo;
