import { Card } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import NextImage from "next/image";

export default function GoalSubgoalFeature() {
  return (
    <Card.Root
      flexDirection="row"
      alignItems="center"
      justifyContent="space-evenly"
      overflow="hidden"
      maxW="4xl"
      mx="auto"
    >
      {/* subgoals progress screenshot */}
      <Card.Header maxW="sm">
        <ChakraImage
          w="full"
          h="auto"
          objectFit="cover"
          alt="subgoals-progress-screenshot"
          asChild
        >
          <NextImage
            src="/images/landing-page/subgoals-progress-screenshot.webp"
            alt="subgoals-progress-screenshot"
            width="448"
            height="359"
          />
        </ChakraImage>
      </Card.Header>
      {/* title & description */}
      <Card.Body>
        <Card.Title mb="2" fontSize={{ base: "xl", sm: "2xl" }}>
          Set Big Goals <br /> & Break Them Down
        </Card.Title>
        <Card.Description>
          Break your goals into clear, achievable subgoals so you always know
          your next step.
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
