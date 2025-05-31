import { IHabitProgress } from "@/types/progress";
import { Card, Grid, Heading } from "@chakra-ui/react";
import HabitCompletionsChart from "./habit-completions-chart";
import { FerrisWheel } from "lucide-react";
import HabitCompletionsTable from "./habit-completions-table";

const HabitProgress = ({
  habitProgress,
}: {
  habitProgress: IHabitProgress;
}) => {
  // destructure necessary properties
  const {
    habit: { title },
  } = habitProgress;

  return (
    <Card.Root size="sm" shadow="sm">
      <Card.Header
        py="7"
        flexDir="row"
        alignItems="center"
        gapX="2"
      >
        <FerrisWheel />
        {/* habit title */}
        <Heading size="2xl" fontWeight="400">
          {title}
        </Heading>
      </Card.Header>
      <Card.Body>
        <Grid gridTemplateColumns={{base: "1fr", md: "1fr minmax(max-content, 1fr)"}} gap={3}>
          {/* visual comparision of habit difficulty completions */}
          <HabitCompletionsChart habitProgress={habitProgress} />
          {/* habit difficulty completions in a table */}
          <HabitCompletionsTable habitProgress={habitProgress} />
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default HabitProgress;
