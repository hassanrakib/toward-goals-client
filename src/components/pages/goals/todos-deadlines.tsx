"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Text, VStack } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  LabelList,
  LabelProps,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

const TodosDeadlines = ({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) => {
  const {
    todosDeadlines: {met: metDeadlines, missed: missedDeadlines}
  } = goalProgress;

  const totalDeadlines = metDeadlines + missedDeadlines;

  const chart = useChart({
    data: [
      {
        name: "todos_deadlines",
        met: totalDeadlines === 0 ? 1 : metDeadlines,
        missed: totalDeadlines === 0 ? 1 : missedDeadlines,
      },
    ],
    series: [
      { name: "met", color: "green.400", stackId: "a" },
      { name: "missed", color: "yellow.400", stackId: "a" },
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
        {Number(value) === 0
          ? null
          : `${getPercentage(Number(value), totalDeadlines || 2)} deadlines`}
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
    //   maxW="sm"
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
      <Chart.Root maxH="100px" chart={chart}>
        <BarChart layout="vertical" data={chart.data}>
          <XAxis type="number" axisLine={false} tickLine={false} hide />
          <YAxis
            type="category"
            axisLine={false}
            tickLine={false}
            dataKey={chart.key("name")}
            hide
          />
          <Legend content={<Chart.Legend />} />
          {chart.series.map((item) => (
            <Bar
              barSize={30}
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              stroke={chart.color(item.color)}
              stackId={item.stackId}
            >
              <LabelList
                dataKey={chart.key(item.name)}
                fill="white"
                content={renderCustomizedLabel}
              />
            </Bar>
          ))}
        </BarChart>
      </Chart.Root>
    </Box>
  );
};
export default TodosDeadlines;
