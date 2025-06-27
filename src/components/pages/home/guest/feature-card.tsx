import {
  Box,
  Card,
  CardBodyProps,
  Image as ChakraImage,
} from "@chakra-ui/react";

interface FeatureCardProps {
  // children is the title with <br /> tag
  children: React.ReactNode;
  description: string;
  mdFlexDirection: CardBodyProps["flexDirection"];
  image: React.ReactNode;
}

export default function FeatureCard({
  children,
  description,
  mdFlexDirection,
  image,
}: FeatureCardProps) {
  return (
    <Card.Root>
      <Card.Body
        gap="5"
        flexDirection={{ base: "column", md: mdFlexDirection }}
        alignItems={{ base: "noraml", md: "center" }}
      >
        {/* screenshot image */}
        <Box flexBasis={{ base: "normal", md: "sm" }}>
          <Box w="sm" mx="auto">
            <ChakraImage w="full" h="auto" shadow="sm" asChild>
              {image}
            </ChakraImage>
          </Box>
        </Box>
        {/* title & description */}
        <Box>
          <Card.Title
            mb="2"
            fontSize={{ base: "xl", sm: "2xl" }}
            lineHeight="tall"
          >
            {children}
          </Card.Title>
          <Card.Description lineHeight="tall">{description}</Card.Description>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
