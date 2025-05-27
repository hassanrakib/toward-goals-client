import { Flex, Heading, VStack } from "@chakra-ui/react";
import Goal from "./goal";
import { IGoalProgress } from "@/types/progress";

export default async function Goals({
  goalsProgress,
}: {
  goalsProgress: IGoalProgress[] | undefined;
}) {
  // if no goalsProgress found
  // doesn't render anything
  if (!goalsProgress?.length) {
    return null;
  }

  return (
    <VStack align="stretch">
      <Heading size="xl">Goals You’re Chasing</Heading>
      <Flex gap="3.5">
        {goalsProgress.map((goalProgress) => (
          <Goal key={goalProgress._id} goalProgress={goalProgress} />
        ))}
      </Flex>
    </VStack>
  );
}
