import { IHabitProgress } from "@/types/progress";
import { Card, Grid, Heading } from "@chakra-ui/react";
import HabitCompletionsChart from "./habit-completions-chart";
import { CalendarSync } from "lucide-react";
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
        bgGradient="to-r"
        gradientFrom="orange.100"
        gradientTo="orange.50"
        py="7"
        flexDir="row"
        alignItems="center"
        gapX="2"
      >
        <CalendarSync />
        {/* habit title */}
        <Heading size="2xl" fontWeight="400">
          {title}
        </Heading>
      </Card.Header>
      <Card.Body>
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap={3}>
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
