import SearchGoal from "@/components/pages/home/auth/search-goal";
import { VStack } from "@chakra-ui/react";

const Goals = () => {
  return (
    <VStack align="stretch" gap={4}>
      {/* search for a goal to start */}
      <SearchGoal />
    </VStack>
  );
};

export default Goals;
