import { useGetSubgoalsProgressQuery } from "@/redux/features/progress/subgoal-progress.api";
import { Box, Spinner } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";
import { useWatch } from "react-hook-form";

export const SubgoalMentionList = ({
  query,
  command,
}: {
  query: string;
  command: SuggestionProps["command"];
}) => {
  // get the selected goal id from the hook form
  const mentionedGoalId = useWatch({ name: "extracted.goalId" });

  // get the selected subgoal id from the hook form
  const mentionedSubgoalId = useWatch({ name: "extracted.subgoalId" });

  // get the started subgoals for the goal
  const { data: subgoalsProgress, isLoading: isGettingSubgoalsProgress } =
    useGetSubgoalsProgressQuery(
      {
        fields: "subgoal",
        goal: mentionedGoalId,
        isCompleted: false,
      },
      // skip data fetching
      // if goal is not mentioned already
      // or if the query doesn't start with the keyword "subgoal"
      // or if subgoal is already mentioned
      {
        skip:
          !mentionedGoalId ||
          !query.startsWith("subgoal") ||
          mentionedSubgoalId,
      }
    );

  // if the query doesn't start with the "subgoal" keyword
  // or if goal is not mentioned already
  // or if subgoal is already mentioned
  // we are not going to render this component
  if (!query.startsWith("subgoal") || !mentionedGoalId || mentionedSubgoalId) {
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
            // send the command to insert subgoalMention node
            // command goes to the SubgoalMentionExtension which is rendering this component
            command({ id: subgoal._id, label: `subgoal ${subgoal.title}` });
          }}
        >
          {subgoal.title}
        </Box>
      ))}
    </Box>
  );
};
