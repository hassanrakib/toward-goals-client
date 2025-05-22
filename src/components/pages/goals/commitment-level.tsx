"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { getRadiusForABarInAProgressBarChart } from "@/utils/progress";
import { Chart, useChart } from "@chakra-ui/charts";
import { Flex, Text } from "@chakra-ui/react";
import { Gem } from "lucide-react";
import { Bar, BarChart, LabelList, LabelProps, XAxis, YAxis } from "recharts";

const CommitmentLevel = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructure necessary properties
  const {
    analytics: {
      commitment: {
        percent: completedCommitment,
        level: {
          level: commitmentLevel,
          maxPercentage: requiredCommitment,
          rewardPointsPerDay,
        },
      },
    },
  } = goalProgress;

  // incomplete commitment
  const incompleteCommitment = requiredCommitment - completedCommitment;

  const chart = useChart({
    data: [
      {
        name: "deepFocus",
        completedCommitment,
        incompleteCommitment,
      },
    ],
    series: [
      { name: "completedCommitment", color: "yellow.100", stackId: "a" },
      { name: "incompleteCommitment", color: "white", stackId: "a" },
    ],
  });

  const completedCommitmentPercentage = getPercentage(
    completedCommitment,
    requiredCommitment
  );

  const incompleteCommitmentPercentage = getPercentage(
    incompleteCommitment,
    requiredCommitment
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
        {`${completedCommitmentPercentage}% completed`}
      </text>
    );
  };

  return (
    <Flex direction="column">
      <Text>Commitment Level : {commitmentLevel}</Text>
      <Flex alignItems="center" spaceX="2">
        <Chart.Root maxH="40px" chart={chart}>
          <BarChart layout="vertical" data={chart.data}>
            <XAxis
              type="number"
              axisLine={true}
              tickLine={false}
              domain={[0, requiredCommitment]}
              hide
            />
            <YAxis
              type="category"
              axisLine={false}
              tickLine={false}
              orientation="left"
              dataKey={chart.key("name")}
              hide
            />
            {chart.series.map((item, index) => (
              <Bar
                barSize={30}
                isAnimationActive={false}
                key={item.name}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
                stroke={chart.color(item.color)}
                radius={getRadiusForABarInAProgressBarChart(
                  index,
                  completedCommitmentPercentage,
                  incompleteCommitmentPercentage
                )}
                stackId={item.stackId}
              >
                {completedCommitmentPercentage > 50 &&
                  item.name === "completedCommitment" && (
                    <LabelList
                      dataKey={chart.key(item.name)}
                      fill="black"
                      content={renderCustomizedLabel}
                    />
                  )}
                {incompleteCommitmentPercentage > 50 &&
                  item.name === "incompleteCommitment" && (
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
        <Flex
          alignItems="center"
          spaceX="0.5"
          color="yellow.400"
          shadow="xs"
          rounded="full"
          padding="1"
        >
          <Text fontSize="xs" fontWeight="medium">
            {rewardPointsPerDay}
          </Text>
          <Gem size="12" />
          <Text fontSize="xs" fontWeight="medium">
            /day
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommitmentLevel;
