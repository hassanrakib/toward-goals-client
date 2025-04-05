import { TGoalSearchResult } from "@/types/goal";
import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Hit } from "algoliasearch/lite";
import NextImage from "next/image";
import { useHits } from "react-instantsearch";

const GoalSearchResults = () => {
  const { items } = useHits<Hit<TGoalSearchResult>>();
  return (
    <VStack>
      {items.map((item) => (
        <Card.Root
          key={item.objectID}
          flexDirection="row"
          overflow="hidden"
          maxW="xl"
        >
          <Image asChild objectFit="cover" maxW="200px" alt="Caffe Latte">
            <NextImage
              src={item.image || ""}
              alt={item.title}
              width={200}
              height={200}
            />
          </Image>
          <Box>
            <Card.Body>
              <Card.Title mb="2">The perfect latte</Card.Title>
              <Card.Description>
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Card.Description>
              <HStack mt="4">
                <Badge>Hot</Badge>
                <Badge>Caffeine</Badge>
              </HStack>
            </Card.Body>
            <Card.Footer>
              <Button>Buy Latte</Button>
            </Card.Footer>
          </Box>
        </Card.Root>
      ))}
    </VStack>
  );
};

export default GoalSearchResults;
