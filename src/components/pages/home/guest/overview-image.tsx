import { Box, Flex } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import NextImage from "next/image";

export default function OverviewImage() {
  return (
    <Flex maxW="3xl" mx="auto">
      <Box>
        <ChakraImage w="full" h="auto" alt="goal-progress-overview" asChild>
          <NextImage
            src="/images/goal-progress-overview.webp"
            alt="goal-progress-overview"
            width="989"
            height="911"
          />
        </ChakraImage>
      </Box>
      <Box>
        <ChakraImage w="full" h="auto" alt="task-progress-overview" asChild>
          <NextImage
            src="/images/task-progress-overview.webp"
            alt="task-progress-overview"
            width="495"
            height="911"
          />
        </ChakraImage>
      </Box>
    </Flex>
  );
}
