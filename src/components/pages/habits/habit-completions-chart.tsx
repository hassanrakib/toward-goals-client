"use client";

import { IHabitProgress } from "@/types/progress";
import { getPercentage } from "@/utils/global";
import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const HabitCompletionsChart = ({
  habitProgress,
}: {
  habitProgress: IHabitProgress;
}) => {
  // destructure habit completions
  const { miniCompletion, plusCompletion, eliteCompletion } = habitProgress;

  // get total habit completions
  const totalCompletions = miniCompletion + plusCompletion + eliteCompletion;

  const chart = useChart({
    data: [
      {
        percentageOfCompletion:
          totalCompletions === 0
            ? 100 / 3
            : getPercentage(miniCompletion, totalCompletions),
        difficulty: "Mini",
        color: "green.solid",
      },
      {
        percentageOfCompletion:
          totalCompletions === 0
            ? 100 / 3
            : getPercentage(plusCompletion, totalCompletions),
        difficulty: "Plus",
        color: "purple.solid",
      },
      {
        percentageOfCompletion:
          totalCompletions === 0
            ? 100 / 3
            : getPercentage(eliteCompletion, totalCompletions),
        difficulty: "Elite",
        color: "red.solid",
      },
    ],
  });

  return (
    <Chart.Root maxH="250px" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={true}
          tickLine={false}
          dataKey={chart.key("difficulty")}
        />
        <YAxis
          axisLine={true}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar
          isAnimationActive={false}
          barSize={30}
          dataKey={chart.key("percentageOfCompletion")}
        >
          {chart.data.map((item) => (
            <Cell key={item.difficulty} fill={chart.color(item.color)} />
          ))}
        </Bar>
      </BarChart>
    </Chart.Root>
  );
};

export default HabitCompletionsChart;
