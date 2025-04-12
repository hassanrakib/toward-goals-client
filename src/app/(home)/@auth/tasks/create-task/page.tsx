"use client";

import Form from "@/components/derived-ui/form";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import SelectSubgoal from "@/components/pages/tasks/create-task/select-subgoal";
import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { useGetSubgoalsProgressQuery } from "@/redux/features/progress/subgoal-progress.api";
import { createTaskSchema } from "@/schemas/task";
import { generateAvailableGoalsCollection } from "@/utils/progress";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  goalId: string[];
  subgoalId: string[];
  habitId: string;
  title: string;
  deadline: string;
}

const CreateTask = () => {
  // know the current
  const [selectedGoalId, setSelectedGoalId] = useState("");

  const {
    data: goalsProgress,
    isLoading: isGettingGoalsProgress,
    error: getGoalsProgressError,
  } = useGetGoalsProgressQuery({
    // fields selection
    fields: "goal",
    // filter
    isCompleted: false,
  });

  // get the started subgoals for the goal
  const { data: subgoalsProgress, isLoading: isGettingSubgoalsProgress } =
    useGetSubgoalsProgressQuery(
      {
        fields: "subgoal",
        goal: selectedGoalId,
        isCompleted: false,
      },
      { skip: !selectedGoalId }
    );

  // default selected subgoal
  const defaultSelectedSubgoal = subgoalsProgress?.data?.[0]
    ? subgoalsProgress.data[0].subgoal._id
    : undefined;

  // form default values
  const defaultValues: IFormValues = {
    goalId: [],
    subgoalId: [defaultSelectedSubgoal || ""],
    habitId: "",
    title: "",
    deadline: "",
  };

  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Task</Card.Title>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(createTaskSchema),
          }}
        >
          <Card.Body gap={3}>
            <StyledSelect
              name="goalId"
              placeholder="Select goal"
              label="Which goal do you want to create a task for?"
              collection={generateAvailableGoalsCollection(goalsProgress)}
              onChange={(data: string[]) => {
                setSelectedGoalId(data[0]);
              }}
            />
            <SelectSubgoal
              selectedGoalId={selectedGoalId}
              defaultSelectedSubgoal={defaultSelectedSubgoal}
              subgoalsProgress={subgoalsProgress}
              isGettingSubgoalsProgress={isGettingSubgoalsProgress}
            />
          </Card.Body>
          <Card.Footer flexDir="column">
            {/* {!isCreatingSubgoal && createSubgoalError ? (
              <Alert status="error">
                {isFetchBaseQueryErrorWithData(createSubgoalError)
                  ? createSubgoalError.data.message
                  : "There was an error processing your request"}
              </Alert>
            ) : !isCreatingSubgoalProgress && createSubgoalProgressError ? (
              <Alert status="error">
                {isFetchBaseQueryErrorWithData(createSubgoalProgressError)
                  ? createSubgoalProgressError.data.message
                  : "There was an error processing your request"}
              </Alert>
            ) : null} */}
            <SubmitButton
              isServerActionLoading={false}
              // isServerActionLoading={
              //   isCreatingSubgoal || isCreatingSubgoalProgress
              // }
              // loadingText="Creating subgoal..."
              // disabled={
              //   isGettingGoalsProgress || Boolean(getGoalsProgressError)
              // }
            >
              Create Task
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default CreateTask;
