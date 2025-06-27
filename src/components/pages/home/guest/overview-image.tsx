import { Box, Flex } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import NextImage from "next/image";

export default function OverviewImage() {
  return (
    <Flex alignItems="center" gap={{base: "1", sm: "2"}} mx="auto">
      <Box shadow="xs">
        <ChakraImage w="full" h="auto" alt="goal-progress-screenshot" asChild>
          <NextImage
            src="/images/landing-page/goal-progress-screenshot.webp"
            alt="goal-progress-screenshot"
            width="448"
            height="558"
          />
        </ChakraImage>
      </Box>
      <Box shadow="xs">
        <ChakraImage w="full" h="auto" alt="tasks-progress-screenshot" asChild>
          <NextImage
            src="/images/landing-page/tasks-progress-screenshot.webp"
            alt="tasks-progress-screenshot"
            width="266"
            height="558"
          />
        </ChakraImage>
      </Box>
    </Flex>
  );
}
