"use client";

import { Alert } from "@/components/ui/alert";
import Form from "@/components/derived-ui/form";
import SubmitButton from "@/components/derived-ui/submit-button";
import TaskDescriptionInput from "@/components/pages/tasks/create-task/task-description-input";
import { toaster } from "@/components/ui/toaster";
import { useCreateTaskMutation } from "@/redux/features/task/task.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createTaskSchema } from "@/schemas/task";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReset } from "react-hook-form";
import { revalidateCacheByTag } from "@/lib/revalidate-cache-apis";
import StyledInput from "@/components/derived-ui/styled-input";

export interface ICreateTaskFormValues {
  // task title
  title: string;
  // tiptap editor's data in html string format
  html: string;
  // extracted from the top node of tiptap editors state (editor.state.doc)
  extracted: {
    // keep the id for goal, subgoal, habit
    goalId: string;
    subgoalId: string;
    habitId: string;
    // keep the date string
    deadline: string;
  };
}

const CreateTaskForm = () => {
  // form default values
  const defaultValues: ICreateTaskFormValues = {
    title: "",
    html: "",
    extracted: {
      goalId: "",
      subgoalId: "",
      habitId: "",
      deadline: "",
    },
  };

  // create task mutation
  const [createTask, { isLoading: isCreatingTask, error: createTaskError }] =
    useCreateTaskMutation();

  // form submit handler
  const onSubmit = async (
    data: ICreateTaskFormValues,
    reset: UseFormReset<ICreateTaskFormValues>
  ) => {
    try {
      const result = await createTask({
        title: data.title,
        description: data.html,
        goal: data.extracted.goalId,
        subgoal: data.extracted.subgoalId,
        habit: data.extracted.habitId,
        deadline: data.extracted.deadline,
      }).unwrap();
      // reset the form
      reset(defaultValues);
      // after successfully creating task
      toaster.create({
        description: result.message,
        type: "info",
      });
      // revalidate client side router cache by the tag
      revalidateCacheByTag("tasks");
    } catch (error: unknown) {
      // show a toaster if task creation fails
      toaster.create({
        title: isFetchBaseQueryErrorWithData(error)
          ? error.data.message
          : "There was an error processing your request",
        type: "error",
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Card.Root size="sm" maxW="xl" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
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
          <Card.Body gap="2">
            {/* task title */}
            <StyledInput
              name="title"
              placeholder="What do you have to complete?"
              type="text"
            />
            {/* initializes 'html' & 'extracted' field */}
            <TaskDescriptionInput />
          </Card.Body>
          <Card.Footer flexDir="column" alignItems="stretch">
            {!isCreatingTask && createTaskError && (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createTaskError)
                    ? createTaskError.data.message
                    : "There was an error processing your request"
                }
              />
            )}
            <SubmitButton
              isServerActionLoading={isCreatingTask}
              loadingText="Creating task..."
            >
              Create Task
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default CreateTaskForm;
