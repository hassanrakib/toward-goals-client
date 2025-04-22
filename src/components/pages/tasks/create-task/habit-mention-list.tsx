import { useGetHabitsProgressQuery } from "@/redux/features/progress/habit-progress.api";
import { Box, Spinner } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";
import { useWatch } from "react-hook-form";

export const HabitMentionList = ({
  query,
  command,
}: {
  query: string;
  command: SuggestionProps["command"];
}) => {
  // get the goal id from the hook form
  const mentionedGoalId = useWatch({ name: "extracted.goalId" });

  // get the habit id from the hook form
  const mentionedHabitId = useWatch({ name: "extracted.habitId" });

  // get the started habits for the goal
  const { data: habitsProgress, isLoading: isGettingHabitsProgress } =
    useGetHabitsProgressQuery(
      {
        fields: "habit",
        goal: mentionedGoalId,
      },
      // skip data fetching
      // if goal is not mentioned already
      // or if the query doesn't start with the keyword "habit"
      // or if habit is already mentioned
      {
        skip:
          !mentionedGoalId || !query.startsWith("habit") || mentionedHabitId,
      }
    );

  // if the query doesn't start with the "habit" keyword
  // or if goal is not mentioned already
  // or if habit is already mentioned
  // we are not going to render this component
  if (!query.startsWith("habit") || !mentionedGoalId || mentionedHabitId) {
    return null;
  }

  // if isGettingHabitsProgress show a spinner
  if (isGettingHabitsProgress) return <Spinner size="sm" />;

  return (
    <Box
      maxH="200px"
      overflowY="auto"
      border="1px solid #ccc"
      bg="white"
      borderRadius="xl"
      p={2}
    >
      {habitsProgress?.data?.map(({ habit }) => {
        // destructure habit difficulties and unit name
        const {
          difficulties,
          unit: { name: unitName },
        } = habit;
        // get the difficulties of a habit ready to show
        const difficultiesClone = { ...difficulties };
        delete difficultiesClone._id;
        const difficultiesString = Object.keys(difficultiesClone)
          .map(
            (difficulty) =>
              `${difficulty}: ${difficultiesClone[difficulty as keyof typeof difficultiesClone]} ${unitName}`
          )
          .join(" | ");

        return (
          <Box
            key={habit._id}
            rounded="xl"
            p={1}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={() => {
              // send the command to insert habitMention node
              // command goes to the HabitMentionExtension which is rendering this component
              command({
                id: habit._id,
                label: `habit ${habit.title}`,
              });
            }}
          >
            {`${habit.title} (${difficultiesString})`}
          </Box>
        );
      })}
    </Box>
  );
};
