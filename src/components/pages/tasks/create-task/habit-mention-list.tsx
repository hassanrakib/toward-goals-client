import { Alert } from "@/components/ui/alert";
import { useGetHabitsOfAGoalQuery } from "@/redux/features/habit/habit.api";
import { HabitDifficultiesName } from "@/types/habit";
import { Box, Link as ChakraLink, Spinner, Text } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";
import NextLink from "next/link";
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
    useGetHabitsOfAGoalQuery(
      {
        goalId: mentionedGoalId,
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
  // or if habit is already mentioned
  // we are not going to render this component
  if (!query.startsWith("habit") || mentionedHabitId) {
    return null;
  }

  return (
    <Box
      maxH="200px"
      overflowY="auto"
      border="1px solid #ccc"
      bg="white"
      borderRadius="xl"
      p={2}
    >
      {/* if loading habits progress */}
      {isGettingHabitsProgress ? (
        <Alert
          size="sm"
          status="neutral"
          title="Loading habits..."
          icon={<Spinner size="sm" />}
        />
      ) : // if habits progress not loading then check mentionedGoalId exits & no data found
      mentionedGoalId && !habitsProgress?.data?.length ? (
        <Alert size="sm" status="neutral">
          <Text>
            No habit found.{" "}
            <ChakraLink asChild variant="underline" colorPalette="yellow">
              <NextLink href={`/habits/create-habit?goalId=${mentionedGoalId}`}>
                Create a habit
              </NextLink>
            </ChakraLink>
          </Text>
        </Alert>
      ) : null}

      {/* if no goal selected */}
      {!mentionedGoalId && (
        <Alert
          size="sm"
          status="neutral"
          title="Please select a goal first writing @goal"
        />
      )}

      {/* show list of habits to select from */}
      {habitsProgress?.data?.map(({ habit }) => {
        // destructure habit difficulties and unit name
        const {
          difficulties,
          unit: { name: unitName },
        } = habit;
        const difficultiesString = Object.keys(difficulties)
          .map(
            (difficulty) =>
              `${difficulty}: ${difficulties[difficulty as HabitDifficultiesName]} ${unitName}`
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
                label: `${habit.title}`,
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
