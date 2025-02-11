"use client";

import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import { Search } from "lucide-react";

interface IFormValues {
  searchTerm: string;
}

const SearchGoal = () => {
  // form default values
  const defaultValues: IFormValues = {
    searchTerm: "",
  };

  // form submit handler
  const onSubmit = async (data: IFormValues) => {
    console.log(data);
  };
  return (
    <Form onSubmit={onSubmit} useFormProps={{ defaultValues }}>
      <StyledInput
        name="searchTerm"
        type="text"
        placeholder="Search for a goal to start"
        startElement={<Search size={18} />}
        bgColor="bg"
      />
    </Form>
  );
};

export default SearchGoal;
