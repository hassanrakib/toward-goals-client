"use client";

import { IGoalProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Badge, Card } from "@chakra-ui/react";
import { TentTree } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  LabelProps,
  Legend,
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
        color: "teal.200",
      },
      {
        name: "skipped",
        value: skippedDaysPercentage,
        color: "yellow.200",
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
      <Card.Body
        position="relative"
        alignItems="stretch"
        justifyContent="center"
        px="2"
      >
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
        <Chart.Root maxH="200px" mt="4" chart={chart}>
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
            <Legend
              payload={chart.data.map((item) => ({
                value:
                  item.name === "worked"
                    ? `Worked ${workedDays} days`
                    : `Skipped ${skippedDays} days`,
                color: item.name === "worked" ? "#81E6D9" : "#ECC94B",
                type: "circle",
                id: item.name,
              }))}
              wrapperStyle={{ paddingTop: 30 }}
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
