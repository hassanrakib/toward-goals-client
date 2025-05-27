"use client";

import StyledDialog from "@/components/derived-ui/styled-dialog";
import { Alert } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTaskMutation } from "@/redux/features/task/task.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { ITask } from "@/types/task";
import { Badge, Portal, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Confetti from "react-confetti";

const CompletedStaus = ({ task }: { task: ITask }) => {
  const { _id: taskId, isCompleted } = task;

  // router from next/navigation
  const router = useRouter();

  // make the dialog component controlled using the state
  const [dialogOpen, setDialogOpen] = useState(false);

  // task update handler
  const [
    updateTask,
    {
      isLoading: isCompletingTask,
      isSuccess: isCompletingTaskSuccessful,
      error: completingTaskError,
    },
  ] = useUpdateTaskMutation();

  // checkbox value change handler
  const markTaskCompleted = async () => {
    // if already completed
    if (isCompleted) {
      return;
    }

    // make the dialog visible
    setDialogOpen(true);

    // update task isCompleted property
    const result = await updateTask({ taskId, isCompleted: true });

    // if successful
    if (result.data?.data) {
      // refresh the current page in the background
      router.refresh();
    }
  };

  return (
    <>
      {/* show celebration when task completed */}
      {isCompletingTaskSuccessful && dialogOpen && (
        <Portal>
          <Confetti />
        </Portal>
      )}
      <StyledDialog
        backdrop={false}
        open={dialogOpen}
        onOpenChange={() => {
          // if the dialog is already open, close it
          if (dialogOpen) {
            setDialogOpen(false);
          }
        }}
        triggerElement={
          <Badge>
            <Checkbox
              colorPalette="green"
              size="xs"
              border="1px solid green"
              shadow="sm"
              checked={isCompleted}
              onCheckedChange={markTaskCompleted}
            />
            Completed
          </Badge>
        }
      >
        {/* if is completing task */}
        {isCompletingTask && (
          <Alert
            size="lg"
            icon={<Spinner />}
            status="neutral"
            title="Completing task..."
          />
        )}
        {/* if is error */}
        {completingTaskError && (
          <Alert
            size="lg"
            status="error"
            title={
              isFetchBaseQueryErrorWithData(completingTaskError)
                ? completingTaskError.data.message
                : "There was an error processing your request"
            }
          />
        )}
        {/* if is completing task successful */}
        {isCompletingTaskSuccessful && (
          <Alert
            size="lg"
            status="success"
            title="Congrats! Your task is complete!!"
          />
        )}
      </StyledDialog>
    </>
  );
};

export default CompletedStaus;
