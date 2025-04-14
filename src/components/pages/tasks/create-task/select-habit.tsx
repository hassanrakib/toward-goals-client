import Alert from "@/components/derived-ui/alert";
import RadioCards from "@/components/derived-ui/radio-cards";
import { RadioCardItem } from "@/components/ui/radio-card";
import { IResponse } from "@/types/global";
import { IHabitProgress } from "@/types/progress";
import { Link as ChakraLink, Table } from "@chakra-ui/react";
import NextLink from "next/link";

interface SelectHabitProps {
  selectedGoalId: string;
  habitsProgress: IResponse<IHabitProgress[]> | undefined;
  isGettingHabitsProgress: boolean;
}

const SelectHabit = ({
  selectedGoalId,
  habitsProgress,
  isGettingHabitsProgress,
}: SelectHabitProps) => {
  return (
    <RadioCards name="habitId" label="Select habit">
      {/* if no goal selected show a message */}
      {!selectedGoalId && (
        <Alert status="info">Please select a goal first</Alert>
      )}
      {/* if loading habits */}
      {isGettingHabitsProgress && <Alert showSpinner>Loading habits...</Alert>}
      {/* if no habit found */}
      {habitsProgress?.data?.length === 0 && (
        <Alert status="error">
          No habit found!{" "}
          <ChakraLink color="blue.500" variant="underline" asChild>
            <NextLink href="/habits/create-habit">Create habit</NextLink>
          </ChakraLink>
        </Alert>
      )}
      {habitsProgress?.data?.map(({ habit }) => {
        // destructure habit difficulties and unit name
        const {
          difficulties,
          unit: { name: unitName },
        } = habit;
        // get the items ready for the table
        const difficultiesClone = { ...difficulties };
        delete difficultiesClone._id;
        const items = Object.keys(difficultiesClone).map((difficulty) => ({
          name: difficulty,
          value: `${difficultiesClone[difficulty as keyof typeof difficultiesClone]} ${unitName}`,
        }));

        return (
          <RadioCardItem
            key={habit._id}
            indicator={null}
            label={habit.title}
            value={habit._id}
            addon={
              <Table.Root size="sm" variant="line">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader colSpan={3} textAlign="center">
                      Difficulties
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items.map((item) => (
                    <Table.Row key={item.name}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell textAlign="end">{item.value}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            }
          />
        );
      })}
    </RadioCards>
  );
};

export default SelectHabit;
