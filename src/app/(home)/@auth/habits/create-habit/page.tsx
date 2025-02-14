"use client";

import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import {
  HabitUnitName,
  HabitUnitType,
  IHabitDifficulties,
} from "@/types/habit";
import {
  Box,
  Card,
  createListCollection,
  Flex,
  Float,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface IFormValues {
  title: string;
  unit: {
    type: HabitUnitType[];
    name: HabitUnitName[];
  };
  difficulties: IHabitDifficulties;
}

const CreateHabit = () => {
  const [unit, setUnit] = useState("");

  const defaultValues: IFormValues = {
    title: "",
    unit: {
      type: [],
      name: [],
    },
    difficulties: {
      mini: 1,
      plus: 2,
      elite: 3,
    },
  };
  const onSubmit = async (data: IFormValues) => {
    console.log(data);
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
            // resolver: zodResolver(),
          }}
        >
          <Card.Body gap={4}>
            <StyledInput
              type="text"
              name="title"
              label="Title"
              placeholder="Enter a descriptive habit title"
            />
            <Box
              position="relative"
              borderWidth="thin"
              px={2}
              py={4}
              rounded="2xl"
            >
              <Float placement="top-start" offsetX={12} bgColor="bg">
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
              px={2}
              py={4}
              rounded="2xl"
            >
              <Float placement="top-start" offsetX="70px" bgColor="bg">
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
          <Card.Footer flexDir="column">
            {/* {!isCreatingGoal && createGoalError ? (
              <Alert status="error">
                {isFetchBaseQueryErrorWithData(createGoalError)
                  ? createGoalError.data.message
                  : "There was an error processing your request"}
              </Alert>
            ) : null} */}
            <SubmitButton
              isServerActionLoading={false}
              loadingText="Creating habit..."
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
