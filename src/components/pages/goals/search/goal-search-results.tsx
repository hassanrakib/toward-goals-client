"use client";

import { TGoalSearchResult } from "@/types/goal";
import { Box, VStack } from "@chakra-ui/react";
import { Hit } from "algoliasearch/lite";
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
    // make sure sentinelRef.current does exist in the dom
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      // This tells the observer to start watching sentinelRef.current
      // When it comes into view — the observer callback runs
      observer.observe(sentinelRef.current);

      // Cleans up the observer on unmount or dependency change
      return () => {
        // stop duplicate observer running
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <Box overflow="auto" p="4" bgColor="bg" borderRadius="md">
      <VStack align="stretch">
        {goals.map((goal) => (
          <GoalSearchResult key={goal.objectID} goalSearchResult={goal} />
        ))}
        {/* when this dom node visible to the viewport, load more data */}
        <Box ref={sentinelRef} aria-hidden="true"></Box>
      </VStack>
    </Box>
  );
};

export default GoalSearchResults;
