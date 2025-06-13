"use client";

import MarkCompleted from "@/components/shared/mark-completed";
import { toaster } from "@/components/ui/toaster";
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
    toaster.create({type: "info", description: "Developer is working on it..."});
  };

  return (
    <MarkCompleted isCompleted={isCompleted} onComplete={markGoalComplete} />
  );
}
