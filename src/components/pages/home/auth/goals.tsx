import { getMyGoalsProgress } from "@/services/progress/goal-progress";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import Goal from "./goal";

export default async function Goals() {
  const goalsProgress = await getMyGoalsProgress();

  return (
    <VStack align="stretch">
      <Heading size="xl">Goals You’re Chasing</Heading>
      <Flex>
        {goalsProgress.data?.map((goalProgress) => (
          <Goal key={goalProgress._id} goalProgress={goalProgress} />
        ))}
      </Flex>
    </VStack>
  );
}
