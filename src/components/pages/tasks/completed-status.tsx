"use client";

import StyledDialog from "@/components/derived-ui/styled-dialog";
import { Alert } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { toaster } from "@/components/ui/toaster";
import { useUpdateTaskMutation } from "@/redux/features/task/task.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { ITask } from "@/types/task";
import { Badge } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompletedStaus = ({ task }: { task: ITask }) => {
  const { _id: taskId, isCompleted } = task;

  // router from next/navigation
  const router = useRouter();

  // make the dialog component controlled using the state
  const [dialogOpen, setDialogOpen] = useState(false);

  // task update handler
  const [updateTask] = useUpdateTaskMutation();

  // checkbox value change handler
  const markTaskCompleted = async () => {
    // if already completed
    if (isCompleted) {
      return;
    }

    // update task isCompleted property
    const result = await updateTask({ taskId, isCompleted: true });

    // if successful
    if (result.data?.data) {
      // make the dialog visible
      setDialogOpen(true);
      // refresh the current page in the background
      router.refresh();
    } else {
      // check if the error response sent from the backend
      if (isFetchBaseQueryErrorWithData(result.error)) {
        toaster.create({ type: "error", title: result.error.data.message });
      }
    }
  };

  return (
    <StyledDialog
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
      <Alert
        size="lg"
        variant="outline"
        status="neutral"
        title="Congrats! Your task is complete!!"
      />
    </StyledDialog>
  );
};

export default CompletedStaus;
