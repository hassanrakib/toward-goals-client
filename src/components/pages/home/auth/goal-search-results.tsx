"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import { TGoalSearchResult } from "@/types/goal";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Hit } from "algoliasearch/lite";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch";
import GoalSearchResult from "./goal-search-result";

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
            <GoalSearchResult key={goal.objectID} goalSearchResult={goal} />
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
