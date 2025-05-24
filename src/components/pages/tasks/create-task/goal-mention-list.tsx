import { Alert } from "@/components/ui/alert";
import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { Box, Spinner, Text, Link as ChakraLink } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";
import NextLink from "next/link";
import { useWatch } from "react-hook-form";

export const GoalMentionList = ({
  query,
  command,
}: {
  query: string;
  command: SuggestionProps["command"];
}) => {
  // goalId from the hook form
  const mentionedGoalId = useWatch({ name: "extracted.goalId" });

  // get => started goals by the user
  const { data: goalsProgress, isLoading: isGettingGoalsProgress } =
    useGetGoalsProgressQuery(
      {
        // fields selection
        fields: "goal",
        // filter
        isCompleted: false,
      },
      {
        // if the query is not started with the keyword "goal"
        // if goal is already mentioned goalId will be found in the hook form
        // skip data fetching
        skip: !query.startsWith("goal") || mentionedGoalId,
      }
    );

  // if the query doesn't start with the "goal" keyword
  // if a goal is already mentioned
  // we are not going to render this component
  if (!query.startsWith("goal") || mentionedGoalId) {
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
      {/* if loading goals progress */}
      {isGettingGoalsProgress ? (
        <Alert
          size="sm"
          status="neutral"
          title="Loading goals..."
          icon={<Spinner size="sm" />}
        />
      ) : // if no data found
      !goalsProgress?.data?.length ? (
        <Alert size="sm" status="neutral">
          <Text>
            No goal found.{" "}
            <ChakraLink asChild variant="underline" colorPalette="yellow">
              <NextLink href={`/goals/create-goal`}>Create a goal</NextLink>
            </ChakraLink>
          </Text>
        </Alert>
      ) : null}

      {/* show list of goals progress to select from */}
      {goalsProgress?.data?.map(({ goal }) => (
        <Box
          key={goal._id}
          rounded="xl"
          p={1}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => {
            // send the command to insert goalMention node
            // command goes to the GoalMentionExtension which is rendering this component
            command({ id: goal._id, label: `goal ${goal.title}` });
          }}
        >
          {goal.title}
        </Box>
      ))}
    </Box>
  );
};
