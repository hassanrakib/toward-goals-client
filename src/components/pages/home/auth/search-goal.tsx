"use client";

import Form from "@/components/derived-ui/form";
import SearchInput from "@/components/derived-ui/search-input";
import InstantSearchProvider from "@/lib/instant-search-provider";
import { SearchIndices } from "@/types/global";
import { Search } from "lucide-react";
import { useState } from "react";
import GoalSearchResults from "./goal-search-results";

interface IFormValues {
  goalName: string;
}

const SearchGoal = () => {
  // state to hold the query state that is managed by the SearchInput
  const [hasQuery, setHasQuery] = useState(false);

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
          <SearchInput
            name="goalName"
            type="text"
            placeholder="Search for a goal to start"
            startElement={<Search size={18} />}
            bgColor="bg"
            setHasQuery={setHasQuery}
          />
          {hasQuery && <GoalSearchResults />}
        </InstantSearchProvider>
      </Form>
  );
};

export default SearchGoal;
