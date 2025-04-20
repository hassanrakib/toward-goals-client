import CreateTaskInput from "@/components/pages/tasks/create-task/create-task-input";
import { Card, Flex } from "@chakra-ui/react";

const CreateTask = () => {
  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Task</Card.Title>
        </Card.Header>

        <Card.Body>
          <CreateTaskInput />
        </Card.Body>
        <Card.Footer flexDir="column">
          {/* {!isCreatingTask && createTaskError && (
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
                </SubmitButton> */}
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default CreateTask;
