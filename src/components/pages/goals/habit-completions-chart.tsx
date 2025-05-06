"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Badge, Box } from "@chakra-ui/react";
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
        color: "green.400",
      },
      {
        name: "Plus",
        value: totalHabitCompletion === 0 ? 1 : totalPlusCompletion,
        color: "yellow.400",
      },
      {
        name: "Elite",
        value: totalHabitCompletion === 0 ? 1 : totalEliteCompletion,
        color: "red.400",
      },
    ],
  });

  return (
    <Box
      bgGradient="to-r"
      gradientFrom="orange.100"
      gradientTo="orange.50"
      borderRadius="xl"
      p={6}
      shadow="md"
      // maxW="sm"
      position="relative"
    >
      <Badge
        colorScheme="orange"
        fontSize="sm"
        position="absolute"
        top="1rem"
        right="1rem"
      >
        🔥 Habit
      </Badge>
      <Chart.Root w="full" h="full" chart={chart}>
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
    </Box>
  );
};

export default HabitCompletionsChart;
