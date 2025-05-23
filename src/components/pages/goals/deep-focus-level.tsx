"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { getRadiusForABarInAProgressBarChart } from "@/utils/progress";
import { Chart, useChart } from "@chakra-ui/charts";
import { Flex, Text } from "@chakra-ui/react";
import { Gem } from "lucide-react";
import { Bar, BarChart, LabelList, LabelProps, XAxis, YAxis } from "recharts";

const DeepFocusLevel = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructure necessary properties
  const {
    analytics: {
      deepFocus: {
        percent: completedDeepFocus,
        level: {
          level: deepFocusLevel,
          maxPercentage: requiredDeepFocus,
          rewardPointsPerDay,
        },
      },
    },
  } = goalProgress;

  // incomplete deep focus
  const incompleteDeepFocus = requiredDeepFocus - completedDeepFocus;

  const chart = useChart({
    data: [
      {
        name: "deepFocus",
        completedDeepFocus,
        incompleteDeepFocus,
      },
    ],
    series: [
      { name: "completedDeepFocus", color: "teal.200", stackId: "a" },
      { name: "incompleteDeepFocus", color: "white", stackId: "a" },
    ],
  });

  const completedDeepFocusPercentage = getPercentage(
    completedDeepFocus,
    requiredDeepFocus
  );

  const incompleteDeepFocusPercentage = getPercentage(
    incompleteDeepFocus,
    requiredDeepFocus
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
        {`${completedDeepFocusPercentage}% completed`}
      </text>
    );
  };

  return (
    <Flex direction="column">
      <Text>Deep Focus Level : {deepFocusLevel}</Text>
      <Flex alignItems="center" spaceX="2">
        <Chart.Root maxH="40px" chart={chart}>
          <BarChart layout="vertical" data={chart.data}>
            <XAxis
              type="number"
              axisLine={true}
              tickLine={false}
              domain={[0, requiredDeepFocus]}
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
                  completedDeepFocusPercentage,
                  incompleteDeepFocusPercentage
                )}
                stackId={item.stackId}
              >
                {completedDeepFocusPercentage > 50 &&
                  item.name === "completedDeepFocus" && (
                    <LabelList
                      dataKey={chart.key(item.name)}
                      fill="black"
                      content={renderCustomizedLabel}
                    />
                  )}
                {incompleteDeepFocusPercentage > 50 &&
                  item.name === "incompleteDeepFocus" && (
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
          rounded="full"
          padding="1"
          bgColor="bg"
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

export default DeepFocusLevel;
