"use client";

import MarkCompleted from "@/components/shared/mark-completed";
import { IGoalProgress } from "@/types/progress";

export default function GoalCompletedStatus({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) {
  // destructure
  const { isCompleted } = goalProgress;

  // do update from here
  const markGoalComplete = () => {
    console.log("goal is complete!!!");
  };

  return (
    <MarkCompleted isCompleted={isCompleted} onComplete={markGoalComplete} />
  );
}
