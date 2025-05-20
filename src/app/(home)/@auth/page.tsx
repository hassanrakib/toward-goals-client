import Goals from "@/components/pages/home/auth/goals";
import SearchGoal from "@/components/pages/home/auth/search-goal";
import { VStack } from "@chakra-ui/react";

const Home = () => {
  return (
    <VStack align="stretch" gap={4}>
      {/* search for a goal to start */}
      <SearchGoal />
      {/* cards of all the started goals by the user */}
      <Goals />
    </VStack>
  );
};

export default Home;
