"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Text, VStack } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  LabelProps,
  XAxis,
  YAxis,
} from "recharts";

const TodosDeadlines = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  const {
    todosDeadlines: {missed: missedDeadlines, met: metDeadlines}
  } = goalProgress;

  const totalDeadlines = missedDeadlines + metDeadlines;

  const metDeadlinesPercentage =
    totalDeadlines === 0 ? 50 : getPercentage(metDeadlines, totalDeadlines);
  const missedDeadlinesPercentage =
    totalDeadlines === 0 ? 50 : getPercentage(missedDeadlines, totalDeadlines);

  const chart = useChart({
    data: [
      {
        name: "met",
        value: metDeadlinesPercentage,
        color: "green.400",
      },
      {
        name: "missed",
        value: missedDeadlinesPercentage,
        color: "yellow.400",
      },
    ],
  });

  const renderCustomizedLabel = (props: LabelProps) => {
    const { x, y, height, value } = props;
    const fontSize = 14;
    return (
      <text
        x={Number(x) + 10}
        y={Number(y) + Number(height) / 2 + fontSize / 2 - 2}
        fill="black"
        fontSize={fontSize}
        fontWeight="bold"
      >
        {totalDeadlines === 0
          ? "50% deadlines"
          : `${getPercentage(Number(value), totalDeadlines)}% deadlines`}
      </text>
    );
  };

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
      <VStack gap={1} alignItems="flex-start">
        <Text fontSize="sm" fontWeight="light">
          Met: {metDeadlines} deadlines
        </Text>
        <Text fontSize="sm" fontWeight="light">
          Missed: {missedDeadlines} deadlines
        </Text>
      </VStack>
      <Chart.Root maxH="150px" chart={chart}>
        <BarChart layout="vertical" data={chart.data}>
          <XAxis
            type="number"
            axisLine={true}
            tickLine={true}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            type="category"
            axisLine={true}
            tickLine={true}
            dataKey={chart.key("name")}
          />
          <Bar
            barSize={30}
            isAnimationActive={true}
            dataKey={chart.key("value")}
          >
            {chart.data.map((item) => (
              <Cell key={item.name} fill={chart.color(item.color)} />
            ))}
            <LabelList
              dataKey={chart.key("value")}
              content={renderCustomizedLabel}
            />
          </Bar>
        </BarChart>
      </Chart.Root>
    </Box>
  );
};
export default TodosDeadlines;
