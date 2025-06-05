"use client";

import StyledDialog from "@/components/derived-ui/styled-dialog";
import MarkCompleted from "@/components/shared/mark-completed";
import { toaster } from "@/components/ui/toaster";
import { useUpdateTaskMutation } from "@/redux/features/task/task.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { ITask } from "@/types/task";
import { Card, Image as ChakraImage } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Confetti from "react-confetti";
import NextImage from "next/image";

const CompletedStaus = ({ task }: { task: ITask }) => {
  const {
    _id: taskId,
    isCompleted,
    completedUnits,
    habit: { difficulties },
  } = task;

  // router from next/navigation
  const router = useRouter();

  // make the dialog component controlled using the state
  const [dialogOpen, setDialogOpen] = useState(false);

  // task update handler
  const [updateTask] = useUpdateTaskMutation();

  // checkbox value change handler
  const markTaskCompleted = async () => {
    try {
      // if task.completedUnits is less than the mini difficulty
      if (completedUnits < difficulties.mini) {
        toaster.create({
          type: "info",
          description: "Complete at least the mini difficulty",
        });

        return;
      }

      // create a toaster
      const toastId = toaster.create({
        type: "loading",
        description: "Completing the task...",
      });

      // update task isCompleted property
      const updateTaskPromise = updateTask({
        taskId,
        isCompleted: true,
      })
        .unwrap()
        .finally(() => {
          // dismiss the loading toast
          // in both cases resolved or rejected
          toaster.dismiss(toastId);
        });

      // await the promise
      await updateTaskPromise;

      // refresh the current page in the background
      router.refresh();

      // make the dialog visible
      setDialogOpen(true);
    } catch (error: unknown) {
      // if error happens
      toaster.create({
        type: "info",
        description: isFetchBaseQueryErrorWithData(error)
          ? error.data.message
          : "There was an error processing your request",
      });
    }
  };

  return (
    <StyledDialog
      size="xs"
      open={dialogOpen}
      onOpenChange={() => {
        // if the dialog is already open, close it
        if (dialogOpen) {
          setDialogOpen(false);
        }
      }}
      triggerElement={
        <MarkCompleted
          isCompleted={isCompleted}
          onComplete={markTaskCompleted}
        />
      }
    >
      <Card.Root rounded="2xl" overflow="hidden">
        <Card.Body p="0" position="relative">
          {/* show confetti on top of the image */}
          <Confetti />
          <ChakraImage alt="success-banner" asChild>
            <NextImage
              src="/images/success-banner.webp"
              alt="success-banner"
              width="1024"
              height="1024"
            />
          </ChakraImage>
        </Card.Body>
      </Card.Root>
    </StyledDialog>
  );
};

export default CompletedStaus;
