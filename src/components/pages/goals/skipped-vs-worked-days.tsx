"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Badge, Card, Text, VStack } from "@chakra-ui/react";
import { TentTree } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  LabelProps,
  XAxis,
  YAxis,
} from "recharts";

const SkippedVsWorkedDays = ({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) => {
  const {
    dayStats: { workedDays, skippedDays },
  } = goalProgress;

  const totalDays = workedDays + skippedDays;

  const workedDaysPercentage =
    totalDays === 0 ? 50 : getPercentage(workedDays, totalDays);
  const skippedDaysPercentage =
    totalDays === 0 ? 50 : getPercentage(skippedDays, totalDays);

  const chart = useChart({
    data: [
      {
        name: "worked",
        value: workedDaysPercentage,
        color: "yellow.100",
      },
      {
        name: "skipped",
        value: skippedDaysPercentage,
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
        {`${value}% days`}
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
          <TentTree size="16" /> Day Stats
        </Badge>
        <VStack gap={1} alignItems="flex-start">
          <Text fontSize="sm" fontWeight="light">
            Worked: {workedDays} days
          </Text>
          <Text fontSize="sm" fontWeight="light">
            Skipped: {skippedDays} days
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
export default SkippedVsWorkedDays;
