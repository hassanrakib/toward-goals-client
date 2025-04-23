import Task from "@/components/pages/tasks/task";
import { getMyTasks } from "@/services/task";
import { VStack } from "@chakra-ui/react";

const Tasks = async () => {
  const tasks = await getMyTasks();

  return (
    <VStack align="stretch">
      {tasks.data?.map((task) => <Task key={task._id} task={task} />)}
    </VStack>
  );
};

export default Tasks;
