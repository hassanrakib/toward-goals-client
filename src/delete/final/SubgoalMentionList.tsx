import { useGetSubgoalsProgressQuery } from "@/redux/features/progress/subgoal-progress.api";
import { Box, Spinner } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";

export const SubgoalMentionList = ({
  query,
  editor,
  command,
}: {
  query: string;
  editor: SuggestionProps["editor"];
  command: SuggestionProps["command"];
}) => {
  // get the goal id from the goalMention extension storage
  const selectedGoalId = editor.storage.goalMention.goalId;

  // get the subgoal id from subgoalMention extension storage
  const subgoalIdInExtensionStorage = editor.storage.subgoalMention.subgoalId;

  // get the started subgoals for the goal
  const { data: subgoalsProgress, isLoading: isGettingSubgoalsProgress } =
    useGetSubgoalsProgressQuery(
      {
        fields: "subgoal",
        goal: selectedGoalId,
        isCompleted: false,
      },
      // skip data fetching
      // if goal is not mentioned already
      // or if the query doesn't start with the keyword "subgoal"
      // or if subgoal is already mentioned
      {
        skip:
          !selectedGoalId ||
          !query.startsWith("subgoal") ||
          subgoalIdInExtensionStorage,
      }
    );

  // if the query doesn't start with the "subgoal" keyword
  // or if goal is not mentioned already
  // or if subgoal is already mentioned
  // we are not going to render this component
  if (
    !query.startsWith("subgoal") ||
    !selectedGoalId ||
    subgoalIdInExtensionStorage
  ) {
    return null;
  }

  // if isGettingSubgoalsProgress show a spinner
  if (isGettingSubgoalsProgress) return <Spinner size="sm" />;

  return (
    <Box
      maxH="200px"
      overflowY="auto"
      border="1px solid #ccc"
      bg="white"
      borderRadius="xl"
      p={2}
    >
      {subgoalsProgress?.data?.map(({ subgoal }) => (
        <Box
          key={subgoal._id}
          rounded="xl"
          p={1}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => {
            // update the storage for the SubgoalMentionExtension
            editor.storage.subgoalMention.subgoalId = subgoal._id;

            // insert this mention node to the doc
            command({ id: subgoal._id, label: `subgoal ${subgoal.title}` });
          }}
        >
          {subgoal.title}
        </Box>
      ))}
    </Box>
  );
};
