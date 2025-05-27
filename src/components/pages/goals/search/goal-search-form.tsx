"use client";

import Form from "@/components/derived-ui/form";
import SearchInput from "@/components/derived-ui/search-input";
import InstantSearchProvider from "@/lib/instant-search-provider";
import { SearchIndices } from "@/types/global";
import { Search } from "lucide-react";
import GoalSearchResults from "./goal-search-results";
import { Box, Grid } from "@chakra-ui/react";
import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { IGoalProgress } from "@/types/progress";
import { Configure } from "react-instantsearch";
import { Alert } from "@/components/ui/alert";
import CreateProgressLink from "@/components/shared/create-progress-link";

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
  } = useGetGoalsProgressQuery({ fields: "goal" });

  // form submit handler
  const onSubmit = async (data: IFormValues) => {
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit} useFormProps={{ defaultValues }}>
      <InstantSearchProvider indexName={SearchIndices.goals}>
        {/* configure filtering */}
        {/* filter out the goals whose startDate already passed */}
        <Configure filters={`startDate > ${Date.now()}`} />
        <Grid
          // max height is set by subtracting ((16 + 16)px padding to the top & bottom + 50px header navbar + 16px gap below the navbar)
          maxH="calc(100dvh - 98px)"
          templateRows="50px 1fr auto"
        >
          {/* show search goal input */}
          <Box>
            <SearchInput
              name="goalName"
              type="text"
              placeholder="Search for a goal to start"
              startElement={<Search size={18} />}
              bgColor="bg"
            />
          </Box>
          {/* show goal search results */}
          {isJoinedGoalsLoading && (
            <Alert status="neutral" variant="surface">
              Loading...
            </Alert>
          )}
          {!isJoinedGoalsLoading && !isErrorGettingJoinedGoals && (
            <GoalSearchResults
              joinedGoals={joinedGoals!.data as IGoalProgress[]}
            />
          )}
          {/* show create goal button */}
          <CreateProgressLink
            callToAction="Haven't you found your goal?"
            actionLink="/goals/create-goal"
            actionLabel="Create goal"
          />
        </Grid>
      </InstantSearchProvider>
    </Form>
  );
};

export default GoalSearchForm;
