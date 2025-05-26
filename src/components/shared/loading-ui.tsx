import { AbsoluteCenter, Box, Card, Spinner } from "@chakra-ui/react";

export default function LoadingUI() {
  return (
    <Box
      // relative to the viewport
      position="fixed"
      // shorthand for top, right, bottom, left = 0
      // covers the entire screen
      inset={0}
      bg="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      // make ui non interactive
      zIndex={9999}
      pointerEvents="auto"
    >
      <AbsoluteCenter>
        <Card.Root size="sm" variant="elevated">
          <Card.Body>
            <Spinner
              size="xl"
              color="yellow.500"
              borderWidth="6px"
              css={{ "--spinner-track-color": "colors.gray.200" }}
            />
          </Card.Body>
        </Card.Root>
      </AbsoluteCenter>
    </Box>
  );
}
