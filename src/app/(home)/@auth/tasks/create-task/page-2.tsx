"use client";

import Alert from "@/components/derived-ui/alert";
import DateInput from "@/components/derived-ui/date-input";
import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import SelectHabit from "@/components/pages/tasks/create-task/select-habit";
import SelectSubgoal from "@/components/pages/tasks/create-task/select-subgoal";
import { toaster } from "@/components/ui/toaster";
import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { useGetHabitsProgressQuery } from "@/redux/features/progress/habit-progress.api";
import { useGetSubgoalsProgressQuery } from "@/redux/features/progress/subgoal-progress.api";
import { useCreateTaskMutation } from "@/redux/features/task/task.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createTaskSchema } from "@/schemas/task";
import { generateAvailableGoalsCollection } from "@/utils/progress";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { endOfToday } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  goalId: string[];
  subgoalId: string;
  habitId: string;
  title: string;
  deadline: Date;
}

const CreateTask = () => {
  // form default values
  const defaultValues: IFormValues = {
    goalId: [],
    subgoalId: "",
    habitId: "",
    title: "",
    deadline: endOfToday(),
  };

  // next js router
  const router = useRouter();

  // know the current selected goal id
  const [selectedGoalId, setSelectedGoalId] = useState("");

  // get started goals by the user
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
  const {
    data: subgoalsProgress,
    isLoading: isGettingSubgoalsProgress,
    error: getSubgoalsProgressError,
  } = useGetSubgoalsProgressQuery(
    {
      fields: "subgoal",
      goal: selectedGoalId,
      isCompleted: false,
    },
    { skip: !selectedGoalId }
  );

  // get the enrolled habits for the goal
  const {
    data: habitsProgress,
    isLoading: isGettingHabitsProgress,
    error: getHabitsProgressError,
  } = useGetHabitsProgressQuery(
    {
      fields: "habit",
      goal: selectedGoalId,
    },
    { skip: !selectedGoalId }
  );

  // create task mutation
  const [createTask, { isLoading: isCreatingTask, error: createTaskError }] =
    useCreateTaskMutation();

  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    try {
      const result = await createTask({
        ...data,
        goal: data.goalId[0],
        subgoal: data.subgoalId,
        habit: data.habitId,
        deadline: data.deadline.toISOString(),
      }).unwrap();

      // reset the form
      reset(defaultValues);

      // after successfully creating task
      toaster.create({
        title: result.message,
        type: "success",
      });
      router.push("/tasks");
    } catch (error: unknown) {
      console.log(error);
    }
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
            <StyledInput
              type="text"
              name="title"
              label="Title"
              placeholder="Got something to get done?"
            />
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
              subgoalsProgress={subgoalsProgress}
              isGettingSubgoalsProgress={isGettingSubgoalsProgress}
            />
            <SelectHabit
              selectedGoalId={selectedGoalId}
              habitsProgress={habitsProgress}
              isGettingHabitsProgress={isGettingHabitsProgress}
            />
            <DateInput
              name="deadline"
              label="Task Deadline"
              placeholder="Select deadline of the task"
            />
          </Card.Body>
          <Card.Footer flexDir="column">
            {!isCreatingTask && createTaskError && (
              <Alert status="error">
                {isFetchBaseQueryErrorWithData(createTaskError)
                  ? createTaskError.data.message
                  : "There was an error processing your request"}
              </Alert>
            )}
            <SubmitButton
              isServerActionLoading={isCreatingTask}
              loadingText="Creating task..."
              disabled={
                Boolean(isGettingGoalsProgress) ||
                Boolean(getGoalsProgressError) ||
                Boolean(getSubgoalsProgressError) ||
                Boolean(getHabitsProgressError)
              }
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
