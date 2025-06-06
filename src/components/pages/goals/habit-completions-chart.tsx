"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { getDifficultyColor } from "@/utils/habit";
import { Chart, useChart } from "@chakra-ui/charts";
import { Badge, Card } from "@chakra-ui/react";
import { FerrisWheel } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

const HabitCompletionsChart = ({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) => {
  const { totalMiniCompletion, totalPlusCompletion, totalEliteCompletion } =
    goalProgress;

  // total habit completions
  const totalHabitCompletion =
    totalMiniCompletion + totalPlusCompletion + totalEliteCompletion;

  // create chart instance
  const chart = useChart({
    data: [
      {
        name: "Mini",
        value: totalHabitCompletion === 0 ? 1 : totalMiniCompletion,
        color: getDifficultyColor("mini"),
      },
      {
        name: "Plus",
        value: totalHabitCompletion === 0 ? 1 : totalPlusCompletion,
        color: getDifficultyColor("plus"),
      },
      {
        name: "Elite",
        value: totalHabitCompletion === 0 ? 1 : totalEliteCompletion,
        color: getDifficultyColor("elite"),
      },
    ],
  });

  return (
    <Card.Root variant="subtle" rounded="xl">
      <Card.Body
        position="relative"
        alignItems="stretch"
        justifyContent="center"
        px="2"
      >
        <Badge
          fontSize="sm"
          position="absolute"
          top="1rem"
          right="1rem"
          variant="surface"
          colorPalette="white"
          rounded="full"
        >
          <FerrisWheel size="16" /> Habit
        </Badge>
        {/* margin adjustment to give space to the badge above */}
        <Chart.Root maxHeight="200px" mt={{ base: "5", sm: "0" }} chart={chart}>
          <PieChart>
            <Pie
              isAnimationActive={false}
              data={chart.data}
              dataKey={chart.key("value")}
              outerRadius={80}
              innerRadius={50}
              labelLine={false}
              // customized label
              label={({ name, index }) => {
                const { value } = chart.data[index ?? -1];
                // if value for a habit difficulty completion is 0, don't show the label
                // as there will be 0% of that difficulty completion within the chart
                if (!value) return undefined;
                const percent = getPercentage(value, totalHabitCompletion || 3);
                return `${name}: ${percent}%`;
              }}
            >
              <Label
                content={({ viewBox }) => (
                  <Chart.RadialText
                    viewBox={viewBox}
                    title={
                      totalMiniCompletion +
                      totalPlusCompletion +
                      totalEliteCompletion
                    }
                    description="completions"
                    fontSize="30px"
                  />
                )}
              />
              {chart.data.map((item) => {
                return <Cell key={item.name} fill={chart.color(item.color)} />;
              })}
            </Pie>
          </PieChart>
        </Chart.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default HabitCompletionsChart;
