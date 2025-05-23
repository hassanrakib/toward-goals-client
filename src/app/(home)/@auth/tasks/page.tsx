import Task from "@/components/pages/tasks/task";
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
    <VStack align="stretch">
      {tasks.data?.map((task) => <Task key={task._id} task={task} />)}
    </VStack>
  );
};

export default Tasks;
