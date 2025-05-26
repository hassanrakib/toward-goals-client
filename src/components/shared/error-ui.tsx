import { Card, Center } from "@chakra-ui/react";
import { Frown } from "lucide-react";
import StyledButton from "../derived-ui/styled-button";
import { useEffect } from "react";

export default function ErrorUI({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    // max height is set by subtracting ((16 + 16)px padding to the top & bottom + 50px header navbar + 16px gap below the navbar)
    <Center minH="calc(100dvh - 98px)">
      <Card.Root w="full" maxW="320px" rounded="xl">
        <Card.Body gap="2">
          <Frown size="30" color="gray" />
          <Card.Title fontSize="4xl">Oops!</Card.Title>
          {/* error message */}
          <Card.Description>{error.message}</Card.Description>
        </Card.Body>
        {/* try again button to reload the page */}
        <Card.Footer>
          <StyledButton onClick={() => window.location.reload()}>
            Try Again
          </StyledButton>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}
