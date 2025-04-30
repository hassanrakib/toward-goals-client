"use client";

import StyledDialog from "@/components/derived-ui/styled-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTaskMutation } from "@/redux/features/task/task.api";
import { ITask } from "@/types/task";
import { Badge, CheckboxCheckedChangeDetails, Text } from "@chakra-ui/react";
import { useState } from "react";

const CompletedStaus = ({ task }: { task: ITask }) => {
  const { _id: taskId, isCompleted } = task;

  // make the dialog component controlled using the state
  const [dialogOpen, setDialogOpen] = useState(false);

  // value of checkbox
  const [checked, setChecked] = useState(false);

  // task update handler
  const [updateTask] = useUpdateTaskMutation();

  // checkbox value change handler
  const onCheckedChange = async (e: CheckboxCheckedChangeDetails) => {
    // if already completed or checked state is true
    if (isCompleted || checked) {
      return;
    }

    // change the state
    setChecked(!!e.checked);

    // update task isCompleted property
    const result = await updateTask({ taskId, isCompleted: true });

    // if successful
    if (result.data?.data) {
      // make the dialog visible
      setDialogOpen(true);
    }
  };

  return (
    <StyledDialog
      open={dialogOpen}
      onExitComplete={() => {
        setDialogOpen(false);
      }}
      triggerElement={
        <Badge>
          <Checkbox
            colorPalette="green"
            size="xs"
            border="1px solid green"
            shadow="sm"
            checked={checked || isCompleted}
            onCheckedChange={onCheckedChange}
          />
          Completed
        </Badge>
      }
    >
      <Text fontSize="2xl">Congrats!</Text>
    </StyledDialog>
  );
};

export default CompletedStaus;
