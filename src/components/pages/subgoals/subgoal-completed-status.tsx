"use client";

import MarkCompleted from "@/components/shared/mark-completed";
import { toaster } from "@/components/ui/toaster";
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
    toaster.create({type: "info", description: "Developer is working on it..."});
  };

  return (
    <MarkCompleted isCompleted={isCompleted} onComplete={markSubgoalComplete} />
  );
}
