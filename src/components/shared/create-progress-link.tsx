import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import StyledButton from "../derived-ui/styled-button";

const CreateProgressLink = ({
  callToAction,
  actionLink,
  actionLabel,
}: {
  callToAction: string;
  actionLink: string;
  actionLabel: string;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      bgColor="bg"
      border="solid"
      borderWidth="thin"
      borderColor="gray.200"
      borderRadius="xl"
      py="1.5"
      px="2"
    >
      <Text>{callToAction}</Text>
      <ChakraLink asChild>
        <NextLink href={actionLink}>
          <StyledButton>{actionLabel}</StyledButton>
        </NextLink>
      </ChakraLink>
    </Box>
  );
};

export default CreateProgressLink;
