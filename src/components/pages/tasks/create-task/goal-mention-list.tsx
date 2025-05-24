import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { Box, Spinner } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";
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

  // if isGettingGoalsProgress show a spinner
  if (isGettingGoalsProgress) return <Spinner size="sm" />;

  return (
    <Box
      maxH="200px"
      overflowY="auto"
      border="1px solid #ccc"
      bg="white"
      borderRadius="xl"
      p={2}
      zIndex="1000"
    >
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
