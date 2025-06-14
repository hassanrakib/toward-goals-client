import { Grid, Heading, VStack } from "@chakra-ui/react";
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
      {/* fit min width columns as much as possible */}
      {/* fill the space expanding columns when a new column can't be inserted */}
      <Grid
        gap="3.5"
        gridTemplateColumns={{
          base: "repeat(auto-fit, minmax(250px, 1fr))",
          md: "repeat(auto-fit, minmax(250px, 280px))",
        }}
      >
        {goalsProgress.map((goalProgress) => (
          <Goal key={goalProgress._id} goalProgress={goalProgress} />
        ))}
      </Grid>
    </VStack>
  );
}
