"use client";

import MarkCompleted from "@/components/shared/mark-completed";
import { ISubgoalProgress } from "@/types/progress";

export default function SubgoalCompletedStatus({
  subgoalProgress,
}: {
  subgoalProgress: ISubgoalProgress;
}) {
  // destructure
  const { isCompleted } = subgoalProgress;

  // do update from here
  const markSubgoalComplete = () => {
    console.log("subgoal is complete!!!");
  };

  return (
    <MarkCompleted isCompleted={isCompleted} onComplete={markSubgoalComplete} />
  );
}
