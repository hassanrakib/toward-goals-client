"use client";

import DateInput from "@/components/derived-ui/date-input";
import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { Alert } from "@/components/ui/alert";
import { toaster } from "@/components/ui/toaster";
import { revalidateCacheByTag } from "@/lib/revalidate-cache-apis";
import { useCreateGoalMutation } from "@/redux/features/goal/goal.api";
import { useCreateGoalProgressMutation } from "@/redux/features/progress/goal-progress.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createGoalSchema } from "@/schemas/goal";
import { GoalCreationData } from "@/types/goal";
import { Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfTomorrow } from "date-fns";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  title: string;
  duration: number;
  userLimit: number;
  startDate: Date;
}

const CreateGoalForm = () => {
  const [createGoal, { isLoading: isCreatingGoal, error: createGoalError }] =
    useCreateGoalMutation();

  const [
    createGoalProgress,
    { isLoading: isCreatingGoalProgress, error: createGoalProgressError },
  ] = useCreateGoalProgressMutation();

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
    const goalCreationData: GoalCreationData = {
      ...data,
      startDate: data.startDate.toISOString(),
    };
    const result = await createGoal(goalCreationData);

    // after successful submission
    if (result.data?.data) {
      // create goal progress in the background
      const goalProgressCreationResult = await createGoalProgress({
        goal: result.data.data._id,
      });

      if (goalProgressCreationResult.data?.data) {
        // reset the form
        reset(defaultValues);
        // revalidate client side router cache by the tag
        revalidateCacheByTag("goalsProgress");
        // show a ui feedback
        toaster.create({type: 'info', description: 'Goal created successfully'});
      }
    }
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
            resolver: zodResolver(createGoalSchema),
          }}
        >
          <Card.Body>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              {/* input fields */}
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
                  label="Duration (in days)"
                  placeholder="Enter Goal Duration"
                  unit="days"
                  min={7}
                  max={365 * 5}
                />
              </GridItem>
              <GridItem>
                <StyledNumberInput
                  name="userLimit"
                  label="User Limit"
                  placeholder="Enter User Limit"
                  unit="users"
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
          {/* errors */}
          <Card.Footer flexDir="column" alignItems="stretch">
            {!isCreatingGoal && createGoalError ? (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createGoalError)
                    ? createGoalError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : !isCreatingGoalProgress && createGoalProgressError ? (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createGoalProgressError)
                    ? createGoalProgressError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : null}
            {/* submit button */}
            <SubmitButton
              isServerActionLoading={isCreatingGoal || isCreatingGoalProgress}
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

export default CreateGoalForm;
