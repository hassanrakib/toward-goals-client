"use client";

import { Alert } from "@/components/ui/alert";
import Form from "@/components/derived-ui/form";
import SubmitButton from "@/components/derived-ui/submit-button";
import CreateTaskInput from "@/components/pages/tasks/create-task/create-task-input";
import { toaster } from "@/components/ui/toaster";
import { useCreateTaskMutation } from "@/redux/features/task/task.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createTaskSchema } from "@/schemas/task";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";

export interface ICreateTaskFormValues {
  // tiptap editor's data in html string format
  html: string;
  // extracted from the tiptap editor's data
  extracted: {
    // keeep the task title
    title: string;
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
    html: "",
    extracted: {
      title: "",
      goalId: "",
      subgoalId: "",
      habitId: "",
      deadline: "",
    },
  };

  // next js router
  const router = useRouter();

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
        title: data.extracted.title,
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
      <Card.Root maxW="xl" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Task</Card.Title>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(createTaskSchema),
            // after submitting behaviour
            reValidateMode: "onSubmit",
          }}
        >
          <Card.Body>
            {/* tiptap editor */}
            <CreateTaskInput />
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
