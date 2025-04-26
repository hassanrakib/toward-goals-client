"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ITask } from "@/types/task";
import { Badge, CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { useState } from "react";

const CompletedStaus = ({ task }: { task: ITask }) => {
  const { _id: taskId, isCompleted } = task;

  const [checked, setChecked] = useState(false);

  const onCheckedChange = (e: CheckboxCheckedChangeDetails) => {
    // if already completed or checked state is true
    if (isCompleted || checked) {
      return;
    }

    setChecked(!!e.checked);
  };

  return (
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
  );
};

export default CompletedStaus;
