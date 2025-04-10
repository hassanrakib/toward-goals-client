"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Flex, Text } from "@chakra-ui/react";
import { Gem } from "lucide-react";
import { Bar, BarChart, LabelList, LabelProps, XAxis, YAxis } from "recharts";

const ConsistencyLevel = ({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) => {
  // destructure necessary properties
  const {
    analytics: {
      consistency: {
        percent: completedConsistency,
        level: {
          level: consistencyLevel,
          maxPercentage: requiredConsistency,
          rewardPointsPerDay,
        },
      },
    },
  } = goalProgress;

  // incomplete consistency
  const incompleteConsistency = requiredConsistency - completedConsistency;

  const chart = useChart({
    data: [
      {
        name: "consistency",
        completedConsistency,
        incompleteConsistency,
      },
    ],
    series: [
      { name: "completedConsistency", color: "green.400", stackId: "a" },
      { name: "incompleteConsistency", color: "gray.200", stackId: "a" },
    ],
  });

  const completedConsistencyPercentage = getPercentage(
    completedConsistency,
    requiredConsistency
  );

  const incompleteConsistencyPercentage = getPercentage(
    incompleteConsistency,
    requiredConsistency
  );

  const renderCustomizedLabel = (props: LabelProps) => {
    const { x, y, height } = props;
    const fontSize = 14;

    return (
      <text
        x={Number(x) + 10}
        y={Number(y) + Number(height) / 2 + fontSize / 2 - 2}
        fill="black"
        fontSize={fontSize}
        fontWeight="bold"
      >
        {`${completedConsistencyPercentage}% completed`}
      </text>
    );
  };

  return (
    <Flex direction="column">
      <Flex alignItems="center" justifyContent="space-between">
        <Text>Consistency Level : {consistencyLevel}</Text>
        <Flex alignItems="center" spaceX={0.5}>
          <Text fontSize="15px" fontWeight="medium">{rewardPointsPerDay}</Text>
          <Gem size="15px" color="#4F8CF7" />
          <Text>/day</Text>
        </Flex>
      </Flex>
      <Chart.Root maxH="40px" chart={chart}>
        <BarChart layout="vertical" data={chart.data}>
          <XAxis type="number" axisLine={false} tickLine={false} hide />
          <YAxis
            type="category"
            axisLine={false}
            tickLine={false}
            orientation="left"
            dataKey={chart.key("name")}
            hide
          />
          {chart.series.map((item) => (
            <Bar
              barSize={30}
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              stroke={chart.color(item.color)}
              radius={10}
              stackId={item.stackId}
            >
              {completedConsistencyPercentage > 50 &&
                item.name === "completedConsistency" && (
                  <LabelList
                    dataKey={chart.key(item.name)}
                    fill="black"
                    content={renderCustomizedLabel}
                  />
                )}
              {incompleteConsistencyPercentage > 50 &&
                item.name === "incompleteConsistency" && (
                  <LabelList
                    dataKey={chart.key(item.name)}
                    fill="black"
                    content={renderCustomizedLabel}
                  />
                )}
            </Bar>
          ))}
        </BarChart>
      </Chart.Root>
    </Flex>
  );
};

export default ConsistencyLevel;
