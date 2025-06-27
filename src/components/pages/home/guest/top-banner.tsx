import StatusCircle from "@/components/derived-ui/status-circle";
import StyledButton from "@/components/derived-ui/styled-button";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function TopBanner() {
  return (
    <VStack textAlign="center" pt="14" pb="5" gap="5" w="full" maxW="lg" mx="auto">
      {/* Slogan in big font size */}
      <Heading size={{ base: "3xl", sm: "4xl", md: "5xl" }}>
        Plan{" "}
        <Box display="inline-flex" alignItems="baseline" whiteSpace="nowrap">
          Bold
          <StatusCircle size="sm" ml="0.5" bgColor="yellow.400" />
        </Box>{" "}
        Track{" "}
        <Box display="inline-flex" alignItems="baseline" whiteSpace="nowrap">
          Smart
          <StatusCircle size="sm" ml="0.5" bgColor="yellow.400" />
        </Box>{" "}
        Achieve{" "}
        <Box display="inline-flex" alignItems="baseline" whiteSpace="nowrap">
          More
          <StatusCircle size="sm" ml="0.5" bgColor="yellow.400" />
        </Box>
      </Heading>
      {/* small description */}
      <Text fontSize="xs" color="fg.muted">
        Toward Goals makes it easy to stay organized, focused, and motivated.
        Set clear goals, track your progress, and celebrate every step you take.
      </Text>
      <StyledButton asChild>
        <Link href="/signup">Start Journey Toward Goals</Link>
      </StyledButton>
    </VStack>
  );
}
