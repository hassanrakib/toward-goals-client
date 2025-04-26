"use client";

import { Alert } from "@/components/ui/alert";
import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import {
  useCreateHabitMutation,
  useCreateHabitUnitMutation,
} from "@/redux/features/habit/habit.api";
import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { useCreateHabitProgressMutation } from "@/redux/features/progress/habit-progress.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { createHabitSchema } from "@/schemas/habit";
import {
  HabitCreationData,
  HabitUnitCreationData,
  HabitUnitName,
  HabitUnitType,
  IHabitDifficulties,
} from "@/types/habit";
import { generateAvailableGoalsCollection } from "@/utils/progress";
import {
  Box,
  Card,
  createListCollection,
  Flex,
  Float,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  goalId: string[];
  title: string;
  unit: {
    type: HabitUnitType[];
    name: HabitUnitName;
  };
  difficulties: IHabitDifficulties;
}

const CreateHabit = () => {
  const [unit, setUnit] = useState("");

  const router = useRouter();

  // query hooks
  const {
    data: goalsProgress,
    isLoading: isGettingGoalsProgress,
    error: getGoalsProgressError,
  } = useGetGoalsProgressQuery({
    fields: "goal",
    isCompleted: false,
  });

  // mutation hooks
  const [
    createHabitUnit,
    { isLoading: isCreatingHabitUnit, error: createHabitUnitError },
  ] = useCreateHabitUnitMutation();

  const [createHabit, { isLoading: isCreatingHabit, error: createHabitError }] =
    useCreateHabitMutation();

  const [
    createHabitProgress,
    { isLoading: isCreatingHabitProgress, error: createHabitProgressError },
  ] = useCreateHabitProgressMutation();

  const defaultValues: IFormValues = {
    goalId: [],
    title: "",
    unit: {
      type: [],
      name: "",
    },
    difficulties: {
      mini: 1,
      plus: 2,
      elite: 3,
    },
  };
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const habitUnit: HabitUnitCreationData = {
      goalId: data.goalId[0],
      type: data.unit.type[0],
      name: data.unit.name,
    };

    const habitUnitResult = await createHabitUnit(habitUnit);

    // if successful in creating habit unit
    if (habitUnitResult.data?.data) {
      const habit: HabitCreationData = {
        goalId: data.goalId[0],
        unit: habitUnitResult.data?.data._id,
        title: data.title,
        difficulties: data.difficulties,
      };

      // create habit
      const habitResult = await createHabit(habit);

      // after successful creation of habit
      if (habitResult.data?.data) {
        const habitProgressCreationResult = await createHabitProgress({
          goal: data.goalId[0],
          habit: habitResult.data.data._id,
        });

        // after successful creation of habit progress
        if (habitProgressCreationResult.data?.data) {
          reset(defaultValues);
          router.push("/habits");
        }
      }
    }
  };

  // generate options for selecting a unit type
  const habitUnitTypesCollection = createListCollection({
    items: [
      { label: HabitUnitType.Time, value: HabitUnitType.Time },
      { label: HabitUnitType.Custom, value: HabitUnitType.Custom },
    ],
  });

  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Habit</Card.Title>
          <Card.Description>
            Remember this will be publicly visible.
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(createHabitSchema),
          }}
        >
          <Card.Body gap={4}>
            <StyledSelect
              name="goalId"
              placeholder="Select goal"
              label="Which goal do you want to create a habit for?"
              collection={generateAvailableGoalsCollection(goalsProgress)}
            />
            <StyledInput
              type="text"
              name="title"
              label="Title"
              placeholder="Enter a descriptive habit title"
            />
            <Box
              position="relative"
              borderWidth="thin"
              px={3}
              py={5}
              rounded="2xl"
            >
              <Float
                placement="top-start"
                offsetX={12}
                px={2}
                bgColor="bg"
                rounded="2xl"
              >
                <Text fontSize="sm" fontWeight={500}>
                  Habit Unit
                </Text>
              </Float>
              <Stack direction="row" gap={3}>
                <StyledSelect
                  name="unit.type"
                  placeholder="Select unit type"
                  label="Type"
                  collection={habitUnitTypesCollection}
                />
                <StyledInput
                  type="text"
                  name="unit.name"
                  label="Name"
                  placeholder="Minute | anything"
                  registerOptions={{
                    onChange(e) {
                      setUnit(e.target.value);
                    },
                  }}
                />
              </Stack>
            </Box>
            <Box
              position="relative"
              borderWidth="thin"
              px={3}
              py={5}
              rounded="2xl"
            >
              <Float
                placement="top-start"
                offsetX="70px"
                px={2}
                bgColor="bg"
                rounded="2xl"
              >
                <Text fontSize="sm" fontWeight={500}>
                  Habit Difficulties
                </Text>
              </Float>
              <Stack direction="row" gap={3}>
                <StyledNumberInput
                  name="difficulties.mini"
                  placeholder="Mini"
                  label="Mini"
                  unit={unit}
                />
                <StyledNumberInput
                  name="difficulties.plus"
                  placeholder="Plus"
                  label="Plus"
                  unit={unit}
                />
                <StyledNumberInput
                  name="difficulties.elite"
                  placeholder="Elite"
                  label="Elite"
                  unit={unit}
                />
              </Stack>
            </Box>
          </Card.Body>
          <Card.Footer flexDir="column" alignItems="stretch">
            {/* errors */}
            {!isCreatingHabitUnit && createHabitUnitError ? (
              <Alert size="sm" variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createHabitUnitError)
                    ? createHabitUnitError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : !isCreatingHabit && createHabitError ? (
              <Alert size="sm" variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createHabitError)
                    ? createHabitError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : !isCreatingHabitProgress && createHabitProgressError ? (
              <Alert size="sm" variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(createHabitProgressError)
                    ? createHabitProgressError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : null}
            <SubmitButton
              isServerActionLoading={
                isCreatingHabitUnit ||
                isCreatingHabit ||
                isCreatingHabitProgress
              }
              loadingText="Creating habit..."
              disabled={
                isGettingGoalsProgress || Boolean(getGoalsProgressError)
              }
            >
              Create habit
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default CreateHabit;
