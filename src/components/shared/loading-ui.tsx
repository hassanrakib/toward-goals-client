import { AbsoluteCenter, Card, Spinner } from "@chakra-ui/react";

export default function LoadingUI() {
  return (
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
  );
}
