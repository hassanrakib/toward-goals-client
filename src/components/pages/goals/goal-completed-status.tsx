"use client";

import MarkCompleted from "@/components/shared/mark-completed";
import { toaster } from "@/components/ui/toaster";
import { useUpdateGoalProgressMutation } from "@/redux/features/progress/goal-progress.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { IGoalProgress } from "@/types/progress";
import { useRouter } from "next/navigation";

export default function GoalCompletedStatus({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) {
  // destructure
  const { isCompleted, _id: goalProgressId } = goalProgress;

  // get the next.js router
  const router = useRouter();

  // rtk query mutation hook
  const [updateGoalProgress] = useUpdateGoalProgressMutation();

  // do update from here
  const markGoalComplete = async () => {
    // mark goal as completed
    const result = await updateGoalProgress({
      goalProgressId,
      isCompleted: true,
    });

    // if successful
    if (result.data?.data) {
      router.refresh();

      toaster.create({
        type: "info",
        description: "Marked goal as completed",
      });
    } else {
      toaster.create({
        type: "error",
        description: isFetchBaseQueryErrorWithData(result.error)
          ? result.error.data.message
          : "There was an error processing your request",
      });
    }
  };

  return (
    <MarkCompleted isCompleted={isCompleted} onComplete={markGoalComplete} />
  );
}
