"use client";

import MarkCompleted from "@/components/shared/mark-completed";
import { toaster } from "@/components/ui/toaster";
import { useUpdateSubgoalProgressMutation } from "@/redux/features/progress/subgoal-progress.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { ISubgoalProgress } from "@/types/progress";
import { useRouter } from "next/navigation";

export default function SubgoalCompletedStatus({
  subgoalProgress,
}: {
  subgoalProgress: ISubgoalProgress;
}) {
  // destructure
  const {
    isCompleted,
    _id: subgoalProgressId,
    goal: { _id: goalId },
  } = subgoalProgress;

  // get the next.js router
  const router = useRouter();

  // mutation hook
  const [updateSubgoalProgress] = useUpdateSubgoalProgressMutation();

  // do update from here
  const markSubgoalComplete = async () => {
    // mark subgoal complete
    const result = await updateSubgoalProgress({
      subgoalProgressId,
      goalId,
      isCompleted: true,
    });

    if (result.data?.data) {
      // refresh the current route
      router.refresh();

      toaster.create({
        type: "info",
        description: "Subgoal is marked completed",
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
    <MarkCompleted isCompleted={isCompleted} onComplete={markSubgoalComplete} />
  );
}
