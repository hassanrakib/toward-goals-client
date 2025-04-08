"use client";

import { IGoalProgress } from "@/types/progress";
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

  // create chart instance
  const chart = useChart({
    data: [
      { name: "Mini", value: totalMiniCompletion || 1, color: "green.400" },
      { name: "Plus", value: totalPlusCompletion || 1, color: "yellow.400" },
      { name: "Elite", value: totalEliteCompletion || 1, color: "red.400" },
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
      maxW="sm"
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
            isAnimationActive={true}
            data={chart.data}
            dataKey={chart.key("value")}
            outerRadius={80}
            innerRadius={50}
            labelLine={false}
            // customized label
            label={({ name, index }) => {
              const { value } = chart.data[index ?? -1];
              const percent = value / chart.getTotal("value");
              return `${name}: ${(percent * 100).toFixed(1)}%`;
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
