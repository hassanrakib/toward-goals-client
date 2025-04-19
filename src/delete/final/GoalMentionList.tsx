import { useGetGoalsProgressQuery } from "@/redux/features/progress/goal-progress.api";
import { Box, Spinner } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";

export const GoalMentionList = ({
  query,
  editor,
  command,
}: {
  query: string;
  editor: SuggestionProps["editor"];
  command: SuggestionProps["command"];
}) => {
  // goalId in the extension storage
  const goalIdInExtensionStorage = editor.storage.goalMention.goalId;

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
        // if goal is already mentioned goalId will be found in the extension storage
        // skip data fetching
        skip: !query.startsWith("goal") || goalIdInExtensionStorage,
      }
    );

  // if the query doesn't start with the "goal" keyword
  // if a goal is already mentioned
  // we are not going to render this component
  if (!query.startsWith("goal") || goalIdInExtensionStorage) {
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
    >
      {goalsProgress?.data?.map(({ goal }) => (
        <Box
          key={goal._id}
          rounded="xl"
          p={1}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => {
            // update the storage for the GoalMentionExtension
            editor.storage.goalMention.goalId = goal._id;
            // send the command to insert goalMention node
            command({ id: goal._id, label: `goal ${goal.title}` });
          }}
        >
          {goal.title}
        </Box>
      ))}
    </Box>
  );
};
