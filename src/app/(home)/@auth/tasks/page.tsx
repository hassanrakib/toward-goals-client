import Task from "@/components/pages/tasks/task";
import CreateProgressLink from "@/components/shared/create-progress-link";
import { getMyTasks } from "@/services/task";
import { VStack } from "@chakra-ui/react";

const Tasks = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  // get the goalId from the search params
  const goalId = (await searchParams).goalId;

  const tasks = await getMyTasks({ goal: goalId });

  return (
    <>
      {/* show create task option */}
      {!tasks.data?.length && (
        <CreateProgressLink
          callToAction="Let's plan your next task?"
          actionLink="/tasks/create-task"
          actionLabel="Create task"
        />
      )}
      {/* show tasks */}
      <VStack alignItems="stretch" maxW="xl" mx="auto" gap="3.5">
        {tasks.data?.map((task) => <Task key={task._id} task={task} />)}
      </VStack>
    </>
  );
};

export default Tasks;
