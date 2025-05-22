import { IGoalProgress } from "@/types/progress";
import HabitCompletionsChart from "./habit-completions-chart";
import CurrentWorkStreak from "./current-work-streak";
import SkippedVsWorkedDays from "./skipped-vs-worked-days";
import TodosDeadlines from "./todos-deadlines";
import Analytics from "./analytics";
import { Card, Grid } from "@chakra-ui/react";
import GoalProgressTop from "./goal-progress-top";

const GoalProgress = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  return (
    <Card.Root>
      <Card.Body>
        {/* Top section with goal image in the background */}
        <GoalProgressTop goalProgress={goalProgress} />
        {/* showing goal progress visually */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4} px="6" py="4">
          <Analytics goalProgress={goalProgress} />
          <HabitCompletionsChart goalProgress={goalProgress} />
          <CurrentWorkStreak goalProgress={goalProgress} />
          <SkippedVsWorkedDays goalProgress={goalProgress} />
          <TodosDeadlines goalProgress={goalProgress} />
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default GoalProgress;
