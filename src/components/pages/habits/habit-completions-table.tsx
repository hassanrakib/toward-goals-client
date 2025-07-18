import StatusCircle from "@/components/derived-ui/status-circle";
import { HabitDifficultiesName } from "@/types/habit";
import { IHabitProgress } from "@/types/progress";
import { getDifficultyColor } from "@/utils/habit";
import { Table } from "@chakra-ui/react";

const HabitCompletionsTable = ({
  habitProgress,
}: {
  habitProgress: IHabitProgress;
}) => {
  // destructure necessary properties
  const {
    totalUnitCompleted,
    habit: {
      difficulties,
      unit: { name: unitName },
    },
  } = habitProgress;

  // generate table data
  const tableData = ["mini", "plus", "elite"].map((difficultyName) => {
    // get the difficulty requirement (such as 1, 2, 3, 4) for every difficulty name
    const difficulty = difficulties[difficultyName as HabitDifficultiesName];

    // get the difficulty completion
    const difficultyCompletions =
      habitProgress[
        `${difficultyName}Completion` as keyof Pick<
          IHabitProgress,
          "miniCompletion" | "plusCompletion" | "eliteCompletion"
        >
      ];

    // get difficulty color
    const difficultyColor = getDifficultyColor(
      difficultyName as HabitDifficultiesName
    );

    return {
      id: difficultyName,
      difficultyDescription: `${difficulty} ${unitName} completed`,
      difficultyCompletions: `${difficultyCompletions} times`,
      difficultyTotalUnitCompleted: `${difficulty}x${difficultyCompletions} = ${difficulty * difficultyCompletions} ${unitName}`,
      difficultyColor,
    };
  });

  return (
    <Table.ScrollArea>
      <Table.Root size="sm" showColumnBorder striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Difficulty</Table.ColumnHeader>
            <Table.ColumnHeader>Completions</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Subtotal</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <StatusCircle mr="1" bgColor={item.difficultyColor} />
                {item.difficultyDescription}
              </Table.Cell>
              <Table.Cell>{item.difficultyCompletions}</Table.Cell>
              <Table.Cell textAlign="end">
                {item.difficultyTotalUnitCompleted}
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell colSpan={2} textAlign="center">
              Total Completed
            </Table.Cell>
            <Table.Cell textAlign="end">
              = {totalUnitCompleted} {unitName}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default HabitCompletionsTable;
