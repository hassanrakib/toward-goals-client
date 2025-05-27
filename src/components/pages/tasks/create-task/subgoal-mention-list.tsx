import { Alert } from "@/components/ui/alert";
import { Box, Spinner, Text, Link as ChakraLink } from "@chakra-ui/react";
import { SuggestionProps } from "@tiptap/suggestion";
import { useWatch } from "react-hook-form";
import NextLink from "next/link";
import { useGetSubgoalsOfAGoalQuery } from "@/redux/features/subgoal/subgoal.api";

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
    useGetSubgoalsOfAGoalQuery(
      {
        goalId: mentionedGoalId,
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
  // or if subgoal is already mentioned
  // we are not going to render this component
  if (!query.startsWith("subgoal") || mentionedSubgoalId) {
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
      {/* if loading subgoals progress */}
      {isGettingSubgoalsProgress ? (
        <Alert
          size="sm"
          status="neutral"
          title="Loading subgoals..."
          icon={<Spinner size="sm" />}
        />
      ) : // if subgoals progress not loading then check mentionedGoalId exits & no data found
      mentionedGoalId && !subgoalsProgress?.data?.length ? (
        <Alert size="sm" status="neutral">
          <Text>
            No subgoal found.{" "}
            <ChakraLink asChild variant="underline" colorPalette="yellow">
              <NextLink
                href={`/subgoals/create-subgoal?goalId=${mentionedGoalId}`}
              >
                Create a subgoal
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

      {/* show list of subgoals to select from */}
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
