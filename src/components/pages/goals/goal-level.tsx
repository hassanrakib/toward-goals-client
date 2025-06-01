"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { getRadiusForABarInAProgressBarChart } from "@/utils/progress";
import { Chart, useChart } from "@chakra-ui/charts";
import { Flex, Text } from "@chakra-ui/react";
import { ArrowUp, Gem } from "lucide-react";
import { Bar, BarChart, LabelList, LabelProps, XAxis, YAxis } from "recharts";

const GoalLevel = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructure necessary properties
  const {
    level: {
      levelUpPoint,
      requirements: mainLevelRequirements,
      requirements: {
        consistency: requiredConsistency,
        deepFocus: requiredDeepFocus,
        commitment: requiredCommitment,
      },
    },
    analytics: acquiredRequirements,
  } = goalProgress;

  // sum of maxPercentage of main level requirements
  const totalRequirement =
    requiredConsistency.maxPercentage +
    requiredDeepFocus.maxPercentage +
    requiredCommitment.maxPercentage;

  // total completed main level requirement
  let totalCompletedRequirement = 0;
  // if acquired levels are equal or greater than required levels of requirements
  Object.keys(acquiredRequirements).forEach((key) => {
    const acquiredRequirement =
      acquiredRequirements[key as keyof typeof acquiredRequirements];

    const mainLevelRequirement =
      mainLevelRequirements[key as keyof typeof mainLevelRequirements];

    // if acquiredRequirement level is greater, add requirements maxPercentage
    // because acquiredRequirement.percent will cross the requirements maxPercentage
    if (acquiredRequirement.level.level > mainLevelRequirement.level) {
      totalCompletedRequirement += mainLevelRequirement.maxPercentage;
    }

    if (acquiredRequirement.level.level === mainLevelRequirement.level) {
      totalCompletedRequirement += acquiredRequirement.percent;
    }
  });

  const completedRequirementPercentage = getPercentage(
    totalCompletedRequirement,
    totalRequirement
  );

  const incompleteRequirement = totalRequirement - totalCompletedRequirement;

  const incompleteRequirementPercentage = getPercentage(
    incompleteRequirement,
    totalRequirement
  );

  const chart = useChart({
    data: [
      {
        name: "level",
        totalCompletedRequirement,
        incompleteRequirement,
      },
    ],
    series: [
      { name: "totalCompletedRequirement", color: "teal.200", stackId: "a" },
      { name: "incompleteRequirement", color: "white", stackId: "a" },
    ],
  });

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
        {`${completedRequirementPercentage}% completed`}
      </text>
    );
  };

  return (
    <Flex flexGrow="1" alignItems="center">
      <Chart.Root maxH="70px" chart={chart}>
        <BarChart layout="vertical" data={chart.data}>
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[0, totalRequirement]}
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
                completedRequirementPercentage,
                incompleteRequirementPercentage
              )}
              stackId={item.stackId}
            >
              {completedRequirementPercentage > 50 &&
                item.name === "totalCompletedRequirement" && (
                  <LabelList
                    dataKey={chart.key(item.name)}
                    fill="black"
                    content={renderCustomizedLabel}
                  />
                )}
              {incompleteRequirementPercentage > 50 &&
                item.name === "incompleteRequirement" && (
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
      <Flex color="white" alignItems="center" spaceX="0.5">
        <ArrowUp size="20px" />
        <Text fontSize="md" fontWeight="medium">
          {levelUpPoint}
        </Text>
        <Gem size="20px" />
      </Flex>
    </Flex>
  );
};

export default GoalLevel;
