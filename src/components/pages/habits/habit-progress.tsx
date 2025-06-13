import { IHabitProgress } from "@/types/progress";
import { Card, Grid, Heading } from "@chakra-ui/react";
import HabitCompletionsChart from "./habit-completions-chart";
import HabitCompletionsTable from "./habit-completions-table";
import { Tag } from "@/components/ui/tag";

const HabitProgress = ({
  habitProgress,
}: {
  habitProgress: IHabitProgress;
}) => {
  // destructure necessary properties
  const {
    habit: { title },
    goal: { title: goalTitle },
  } = habitProgress;

  return (
    <Card.Root size="sm" shadow="sm">
      <Card.Header gap="unset" py="7">
        {/* habit title */}
        <Heading size="xl">
          {title}
        </Heading>
        <Tag colorPalette="yellow" variant="outline">
          @goal {goalTitle}
        </Tag>
      </Card.Header>
      <Card.Body>
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr minmax(max-content, 1fr)",
          }}
          gap={3}
        >
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
