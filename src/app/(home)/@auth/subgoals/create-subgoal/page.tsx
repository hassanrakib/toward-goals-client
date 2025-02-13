"use client";

import Alert from "@/components/derived-ui/alert";
import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import { useCreateSubgoalMutation } from "@/redux/features/subgoal/subgoal.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createSubgoalSchema } from "@/schemas/subgoal";
import { SubgoalCreationData } from "@/types/subgoal";
import { Card, createListCollection, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";

const CreateGoal = () => {
  // router from next/navigation
  const router = useRouter();

  const [
    createSubgoal,
    { isLoading: isCreatingSubgoal, error: createSubgoalError },
  ] = useCreateSubgoalMutation();

  const defaultValues: SubgoalCreationData = {
    goalId: "",
    title: "",
    duration: 1,
  };

  const onSubmit = async (
    data: SubgoalCreationData,
    reset: UseFormReset<SubgoalCreationData>
  ) => {
    const result = await createSubgoal(data);

    if (result.data?.data) {
      reset(defaultValues);
      router.push("/subgoals");
    }
  };

  const availableGoalsCollection = createListCollection({
    items: [
      {
        label: "Learn X",
        value: "Learn X",
      },
      {
        label: "Learn Y",
        value: "Learn Y",
      },
    ],
  });

  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Subgoal</Card.Title>
          <Card.Description>
            Remember this will be publicly visible.
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(createSubgoalSchema),
          }}
        >
          <Card.Body gap={3}>
            <StyledSelect
              name="goalId"
              placeholder="Select goal"
              label="Which goal do you want to create a subgoal for?"
              collection={availableGoalsCollection}
            />
            <StyledInput
              type="text"
              name="title"
              label="Title"
              placeholder="Enter a descriptive subgoal title"
            />
            <StyledNumberInput
              name="duration"
              label="Duration (in days)"
              placeholder="Enter Subgoal Duration"
              min={1}
              max={365}
            />
          </Card.Body>
          <Card.Footer flexDir="column">
            {!isCreatingSubgoal && createSubgoalError ? (
              <Alert status="error">
                {isFetchBaseQueryErrorWithData(createSubgoalError)
                  ? createSubgoalError.data.message
                  : "There was an error processing your request"}
              </Alert>
            ) : null}
            <SubmitButton
              isServerActionLoading={isCreatingSubgoal}
              loadingText="Creating subgoal..."
            >
              Create subgoal
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default CreateGoal;
