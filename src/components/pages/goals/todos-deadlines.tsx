"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Badge, Card, Text, VStack } from "@chakra-ui/react";
import { AlarmClockPlus } from "lucide-react";
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
    todosDeadlines: { missed: missedDeadlines, met: metDeadlines },
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
        color: "yellow.100",
      },
      {
        name: "missed",
        value: missedDeadlinesPercentage,
        color: "white",
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
        {`${value}% deadlines`}
      </text>
    );
  };

  return (
    <Card.Root variant="subtle" rounded="xl">
      <Card.Body position="relative">
        <Badge
          fontSize="sm"
          position="absolute"
          top="1rem"
          right="1rem"
          variant="surface"
          colorPalette="white"
          rounded="full"
        >
          <AlarmClockPlus size="16" /> Deadlines
        </Badge>
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
              radius={[0, 12, 12, 0]}
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
      </Card.Body>
    </Card.Root>
  );
};
export default TodosDeadlines;
