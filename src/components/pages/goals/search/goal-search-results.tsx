"use client";

import { TransformedGoalSearchResult } from "@/types/goal";
import { Box, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
  useInstantSearch,
} from "react-instantsearch";
import { IGoalProgress } from "@/types/progress";
import GoalSearchResult from "./goal-search-result";
import { Alert } from "@/components/ui/alert";

const GoalSearchResults = ({
  joinedGoals,
}: {
  joinedGoals: IGoalProgress[];
}) => {
  // transform the items returned by useInfiniteHits()
  const transformItemsCallback: UseInfiniteHitsProps<TransformedGoalSearchResult>["transformItems"] =
    (items) => {
      return items.map((item) => ({
        // copy the original item
        ...item,
        // add a new property
        // for every item in the search result
        //  we will check the item.objectId with the goal _id of joinedGoals
        joined: joinedGoals.some(
          (joinedGoal) => joinedGoal.goal._id === item.objectID
        ),
      }));
    };

  // use useCallback to prevent rendering endlessly because of passing different
  // function reference to the useInfiniteHits() hook
  const cachedTransformItemsCallback = useCallback(transformItemsCallback, [
    joinedGoals,
  ]);

  const {
    items: goals,
    isLastPage,
    showMore,
  } = useInfiniteHits({ transformItems: cachedTransformItemsCallback });

  const { status: searchStatus } = useInstantSearch();

  // dom node at the bottom after all the goal search result
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
      {/* if searchStatus loading */}
      {searchStatus === "loading" && (
        <Alert status="neutral" variant="surface">
          Loading...
        </Alert>
      )}
      {/* if no goals found for the search */}
      {searchStatus === "stalled" && !goals.length && (
        <Alert status="neutral" variant="surface">
          No goals found!
        </Alert>
      )}
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
