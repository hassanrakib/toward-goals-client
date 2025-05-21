"use client";

import Form from "@/components/derived-ui/form";
import SearchInput from "@/components/derived-ui/search-input";
import InstantSearchProvider from "@/lib/instant-search-provider";
import { SearchIndices } from "@/types/global";
import { Search } from "lucide-react";
import GoalSearchResults from "./goal-search-results";
import { Box, Grid, Link, Text } from "@chakra-ui/react";
import StyledButton from "@/components/derived-ui/styled-button";

interface IFormValues {
  goalName: string;
}

const GoalSearchForm = () => {
  // form default values
  const defaultValues: IFormValues = {
    goalName: "",
  };

  // form submit handler
  const onSubmit = async (data: IFormValues) => {
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit} useFormProps={{ defaultValues }}>
      <InstantSearchProvider indexName={SearchIndices.goals}>
        <Grid
          // max height is set by subtracting ((16 + 16)px padding to the top & bottom + 50px header navbar + 16px gap below the navbar)
          maxH="calc(100dvh - 98px)"
          templateRows="50px 1fr 50px"
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
          <GoalSearchResults />
          {/* show create goal button */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            border="solid"
            borderWidth="thin"
            borderColor="fg.subtle"
            borderRadius="md"
          >
            <Text>Haven&apos;t you find your goal?</Text>
            <Text>
              <Link href="/goals/create-goal">
                <StyledButton>Create Goal</StyledButton>
              </Link>
            </Text>
          </Box>
        </Grid>
      </InstantSearchProvider>
    </Form>
  );
};

export default GoalSearchForm;
