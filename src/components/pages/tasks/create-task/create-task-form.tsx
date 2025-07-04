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
import { useRouter } from "next/navigation";

export interface ICreateTaskFormValues {
  // task title
  title: string;
  // tiptap editor's data in json string format
  json: string;
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

const CreateTaskForm = ({ title }: { title?: string | null }) => {
  // form default values
  const defaultValues: ICreateTaskFormValues = {
    title: title || "",
    json: "",
    extracted: {
      goalId: "",
      subgoalId: "",
      habitId: "",
      deadline: "",
    },
  };

  // next.js router
  const router = useRouter();

  // create task mutation
  const [
    createTask,
    {
      isLoading: isCreatingTask,
      error: createTaskError,
      isSuccess: isTaskCreationSuccessful,
    },
  ] = useCreateTaskMutation();

  // form submit handler
  const onSubmit = async (
    data: ICreateTaskFormValues,
    reset: UseFormReset<ICreateTaskFormValues>
  ) => {
    try {
      const result = await createTask({
        title: data.title,
        description: data.json,
        goal: data.extracted.goalId,
        subgoal: data.extracted.subgoalId,
        habit: data.extracted.habitId,
        deadline: data.extracted.deadline,
      }).unwrap();
      // reset the form
      // manually reset the title because its default value
      // is set from the search params
      reset({ title: "", json: "", ...defaultValues.extracted });
      // after successfully creating task
      toaster.create({
        description: result.message,
        type: "info",
      });
      // revalidate client side router cache by the tag
      revalidateCacheByTag("tasks");

      // redirect to the '/tasks' route
      router.push("/tasks");
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
      <Card.Root
        size="sm"
        maxW="xl"
        w="100%"
        borderRadius="2xl"
        boxShadow="xs"
        bg="bg"
      >
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
            {/* initializes 'json' & 'extracted' field */}
            <TaskDescriptionInput
              isTaskCreationSuccessful={isTaskCreationSuccessful}
            />
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
