"use client";

import { Alert } from "@/components/ui/alert";
import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { useCreateSubgoalProgressMutation } from "@/redux/features/progress/subgoal-progress.api";
import { useCreateSubgoalMutation } from "@/redux/features/subgoal/subgoal.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createSubgoalSchema } from "@/schemas/subgoal";
import { SubgoalCreationData } from "@/types/subgoal";
import { generateAvailableGoalsCollection } from "@/utils/progress";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  goalId: string[];
  title: string;
  duration: number;
}

const CreateSubgoal = () => {
  // router from next/navigation
  const router = useRouter();

  const {
    data: goalsProgress,
    isLoading: isGettingGoalsProgress,
    error: getGoalsProgressError,
  } = useGetGoalsProgressQuery({
    fields: "goal",
    isCompleted: false,
  });

  // create subgoal mutation
  const [
    createSubgoal,
    { isLoading: isCreatingSubgoal, error: createSubgoalError },
  ] = useCreateSubgoalMutation();

  // create subgoal progress mutation
  const [
    createSubgoalProgress,
    { isLoading: isCreatingSubgoalProgress, error: createSubgoalProgressError },
  ] = useCreateSubgoalProgressMutation();

  const defaultValues: IFormValues = {
    goalId: [],
    title: "",
    duration: 1,
  };

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const newSubgoal: SubgoalCreationData = {
      ...data,
      goalId: data.goalId[0],
    };
    const result = await createSubgoal(newSubgoal);

    // after successful creation of subgoal
    if (result.data?.data) {
      const subgoalProgressCreationResult = await createSubgoalProgress({
        goal: data.goalId[0],
        subgoal: result.data.data._id,
      });

      // after successful creation of subgoal progress
      if (subgoalProgressCreationResult.data?.data) {
        reset(defaultValues);
        router.push("/subgoals");
      }
    }
  };

  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Subgoal</Card.Title>
          <Card.Description>
            Remember this will be publicly visible.
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(createSubgoalSchema),
          }}
        >
          <Card.Body gap={3}>
            <StyledSelect
              name="goalId"
              placeholder="Select goal"
              label="Which goal do you want to create a subgoal for?"
              collection={generateAvailableGoalsCollection(goalsProgress)}
            />
            <StyledInput
              type="text"
              name="title"
              label="Title"
              placeholder="Enter a descriptive subgoal title"
            />
            <StyledNumberInput
              name="duration"
              label="Duration"
              unit="days"
              placeholder="Enter Subgoal Duration"
              min={1}
              max={365}
            />
          </Card.Body>
          <Card.Footer flexDir="column" alignItems="stretch">
            {!isCreatingSubgoal && createSubgoalError ? (
              <Alert size="sm" variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createSubgoalError)
                    ? createSubgoalError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : !isCreatingSubgoalProgress && createSubgoalProgressError ? (
              <Alert size="sm" variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createSubgoalProgressError)
                    ? createSubgoalProgressError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : null}
            <SubmitButton
              isServerActionLoading={
                isCreatingSubgoal || isCreatingSubgoalProgress
              }
              loadingText="Creating subgoal..."
              disabled={
                isGettingGoalsProgress || Boolean(getGoalsProgressError)
              }
            >
              Create subgoal
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default CreateSubgoal;
