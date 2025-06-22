"use client";

import Form from "@/components/derived-ui/form";
import StyledArrayInput from "@/components/derived-ui/styled-array-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { toaster } from "@/components/ui/toaster";
import { useUpdateSubgoalProgressMutation } from "@/redux/features/progress/subgoal-progress.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { updateSubgoalProgressKeyMilestonesSchema } from "@/schemas/progress";
import { ISubgoalProgress } from "@/types/progress";
import { VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  keyMilestones: { milestone: string }[];
}

export default function AddKeyMilestones({
  subgoalProgress,
}: {
  subgoalProgress: ISubgoalProgress;
}) {
  // destructure
  const {
    _id: subgoalProgressId,
    goal: { _id: goalId },
    keyMilestones,
  } = subgoalProgress;

  // get the next.js router
  const router = useRouter();

  // form default values
  const defaultValues: IFormValues = {
    keyMilestones: [],
  };

  // get the already added keyMilestones count
  const alreadyAddedKeyMilestonesCount = keyMilestones.length;

  // know the current field count from StyledArrayInput
  const [currentFieldCount, setCurrentFieldCount] = useState(0);

  // mutation hook
  const [updateSubgoalProgress, { isLoading: isUpdatingSubgoalProgress }] =
    useUpdateSubgoalProgressMutation();

  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    // prepare new milestones to save
    const newKeyMilestones = data.keyMilestones.map(
      ({ milestone }) => milestone
    );

    // save new milestones
    const result = await updateSubgoalProgress({
      goalId,
      subgoalProgressId,
      keyMilestones: newKeyMilestones,
    });

    // if successfully added keyMilestones
    if (result.data?.data) {
      // reset the form with defautlValues
      reset(defaultValues);

      // refresh the current route
      router.refresh();

      // finally show a ui feedback
      toaster.create({ type: "info", description: "New key milestones added" });
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
    <Form
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues,
        resolver: zodResolver(updateSubgoalProgressKeyMilestonesSchema),
      }}
    >
      <VStack maxW="lg" alignItems="stretch">
        <StyledArrayInput
          arrayName="keyMilestones"
          fieldName="milestone"
          // maxFieldCount will be total milestones count - already added milestones count
          maxFieldCount={5 - alreadyAddedKeyMilestonesCount}
          onFieldCountChange={setCurrentFieldCount}
          type="text"
          placeholder="Add a new milestone"
        />
        {/* if current field count is greater than 0, show submit button */}
        {currentFieldCount > 0 && (
          <SubmitButton isServerActionLoading={isUpdatingSubgoalProgress}>
            Save New Milestones
          </SubmitButton>
        )}
      </VStack>
    </Form>
  );
}
