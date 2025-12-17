"use client";

import Form from "@/components/derived-ui/form";
import SearchInput from "@/components/derived-ui/search-input";
import InstantSearchProvider from "@/lib/instant-search-provider";
import { SearchIndices } from "@/types/global";
import { Search } from "lucide-react";
import GoalSearchResults from "./goal-search-results";
import { Box, Card, Flex, Text, Image as ChakraImage } from "@chakra-ui/react";
import { Configure } from "react-instantsearch";
import CreateProgressLink from "@/components/shared/create-progress-link";
import { useGetMyJoinedGoalsQuery } from "@/redux/features/goal/goal.api";
import { MyJoinedGoal } from "@/types/goal";
import NextImage from "next/image";
import { Alert } from "@/components/ui/alert";

interface IFormValues {
  goalName: string;
}

const GoalSearchForm = () => {
  // form default values
  const defaultValues: IFormValues = {
    goalName: "",
  };

  // get all the goals that are joined by the user
  // to compare with goal search result
  // so that, we can disable the 'join goal' option
  // for those goal that are already joined by the user
  const {
    data: joinedGoals,
    isLoading: isJoinedGoalsLoading,
    isError: isErrorGettingJoinedGoals,
    isSuccess: isSuccessGettingJoinedGoals,
  } = useGetMyJoinedGoalsQuery({ isCompleted: false });

  // form submit handler
  const onSubmit = async (data: IFormValues) => {
    console.log(data);
  };

  return (
    <Card.Root shadow="xs" rounded="2xl">
      <Card.Header>
        <Card.Title fontSize="2xl">Search Goals</Card.Title>
        <Card.Description>
          Join with others in completing a goal.
        </Card.Description>
      </Card.Header>
      <Form onSubmit={onSubmit} useFormProps={{ defaultValues }}>
        <Card.Body gap="2">
          <InstantSearchProvider indexName={SearchIndices.goals}>
            {/* configure filtering */}
            {/* filter out the goals whose startDate already passed */}
            <Configure filters={`startDate > ${Date.now()}`} />
            {/* show search goal input */}
            <Box>
              <SearchInput
                name="goalName"
                type="text"
                placeholder="Search for a goal to start"
                startElement={<Search size={18} />}
              />
            </Box>
            {/* algolia logo */}
            <Flex gap="1" alignItems="center" alignSelf="flex-end">
              <Text fontSize="xs" color="fg.muted">
                Search by
              </Text>
              <ChakraImage width="full" maxWidth="60px" height="auto" asChild>
                <NextImage
                  src="/images/algolia-logo.webp"
                  alt="algolia-logo"
                  width="879"
                  height="230"
                />
              </ChakraImage>
            </Flex>
            {/* if is joined goals loading */}
            {isJoinedGoalsLoading && (
              <Alert status="neutral" variant="surface">
                Loading goals...
              </Alert>
            )}
            {/* if is error getting joined goals */}
            {isErrorGettingJoinedGoals && (
              <Alert status="error" variant="surface">
                Error processing your request
              </Alert>
            )}
            {/* show goal search results */}
            {isSuccessGettingJoinedGoals && (
              <GoalSearchResults
                joinedGoals={joinedGoals!.data as MyJoinedGoal[]}
              />
            )}
          </InstantSearchProvider>
        </Card.Body>
        <Card.Footer>
          {/* show create goal button */}
          <CreateProgressLink
            callToAction="Haven't you found your goal?"
            actionLink="/goals/create-goal"
            actionLabel="Create goal"
          />
        </Card.Footer>
      </Form>
    </Card.Root>
  );
};

export default GoalSearchForm;
