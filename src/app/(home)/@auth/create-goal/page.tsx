"use client";

import DateInput from "@/components/derived-ui/date-input";
import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { startOfTomorrow } from "date-fns";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  title: string;
  duration: number;
  userLimit: number;
  startDate: Date;
}

const CreateGoal = () => {
  const defaultValues: IFormValues = {
    title: "",
    duration: 7,
    userLimit: 1,
    startDate: startOfTomorrow(),
  };

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    console.log(data);

    reset(defaultValues);
  };

  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Goal</Card.Title>
          <Card.Description>
            Remember this will be publicly visible.
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
          }}
        >
          <Card.Body>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <GridItem colSpan={2}>
                <StyledInput
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Enter a descriptive goal title"
                />
              </GridItem>
              <GridItem>
                <StyledNumberInput
                  name="duration"
                  label="Duration"
                  placeholder="Enter Goal Duration"
                  min={7}
                  max={365 * 5}
                />
              </GridItem>
              <GridItem>
                <StyledNumberInput
                  name="userLimit"
                  label="User Limit"
                  placeholder="Enter User Limit"
                  min={1}
                  max={200}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <DateInput
                  name="startDate"
                  label="Start Date"
                  placeholder="Select start date of the goal"
                />
              </GridItem>
            </Grid>
          </Card.Body>
          <Card.Footer flexDir="column">
            <SubmitButton
              isServerActionLoading={false}
              loadingText="Creating goal..."
            >
              Create goal
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default CreateGoal;
