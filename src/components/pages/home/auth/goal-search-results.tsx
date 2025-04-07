import StyledButton from "@/components/derived-ui/styled-button";
import { TGoalSearchResult } from "@/types/goal";
import { Badge, Box, Card, Text, VStack } from "@chakra-ui/react";
import { Hit } from "algoliasearch/lite";
import { format } from "date-fns";
import { CalendarDays, Hourglass } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch";

const GoalSearchResults = () => {
  const {
    items: goals,
    isLastPage,
    showMore,
  } = useInfiniteHits<Hit<TGoalSearchResult>>();
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <Box mt="2" p="4" bgColor="bg" borderRadius="md">
      <Box maxHeight="300px" overflow="auto">
        <VStack align="stretch">
          {goals.map((goal) => (
            <Card.Root
              key={goal.objectID}
              flexDirection="row"
              alignItems="center"
              overflow="hidden"
            >
              <Card.Body p="3">
                <Card.Title mb="1">{goal.title}</Card.Title>
                <VStack alignItems="flex-start" gap="2">
                  <Box display="flex" alignItems="center" spaceX="1">
                    <CalendarDays />
                    <Text>Starting on {format(goal.startDate, "PPP")}</Text>
                  </Box>
                  <Box display="flex" alignItems="center" spaceX="1">
                    <Hourglass />
                    <Text>Goal duration {goal.duration} days</Text>
                  </Box>
                  <Badge>{goal.userCount} people joined</Badge>
                </VStack>
              </Card.Body>
              <Card.Footer pb="0">
                <StyledButton>Join Goal</StyledButton>
              </Card.Footer>
            </Card.Root>
          ))}
          {/* when this dom node visible to the viewport, load more data */}
          <Box ref={sentinelRef} aria-hidden="true"></Box>
        </VStack>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        border="solid"
        borderWidth="thin"
        borderColor="fg.subtle"
        borderRadius="md"
        p="3"
      >
        <Text>Haven&apos;t you find your goal?</Text>
        <Text>
          <Link href="/goals/create-goal">
            <StyledButton>Create Goal</StyledButton>
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default GoalSearchResults;
