import StyledButton from "@/components/derived-ui/styled-button";
import { toaster } from "@/components/ui/toaster";
import { useCreateGoalProgressMutation } from "@/redux/features/progress/goal-progress.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { TransformedGoalSearchResult } from "@/types/goal";
import { Badge, Box, Card, Text, VStack } from "@chakra-ui/react";
import { Hit } from "algoliasearch/lite";
import { format } from "date-fns";
import { CalendarDays, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";

const GoalSearchResult = ({
  goalSearchResult,
}: {
  goalSearchResult: Hit<TransformedGoalSearchResult>;
}) => {
  // nextjs router
  const router = useRouter();

  // redux mutation hook to trigger createGoalProgress
  const [createGoalProgress, { isLoading: isCreatingGoalProgress }] =
    useCreateGoalProgressMutation();

  const handleCreateGoalProgress = async (goalId: string) => {
    try {
      const result = await createGoalProgress({
        goal: goalId,
      }).unwrap();

      // after successfully creating goal progress
      toaster.create({
        title: result.message,
        type: "success",
      });
      router.push("/goals");
    } catch (error: unknown) {
      if (isFetchBaseQueryErrorWithData(error)) {
        toaster.create({
          title: error.data.message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "There was an error processing your request",
          type: "error",
        });
      }
    }
  };

  return (
    <Card.Root flexDirection="row" alignItems="center" overflow="hidden">
      <Card.Body p="3">
        <Card.Title mb="1">{goalSearchResult.title}</Card.Title>
        <VStack alignItems="flex-start" gap="2">
          <Box display="flex" alignItems="center" spaceX="1">
            <CalendarDays />
            <Text>Starting on {format(goalSearchResult.startDate, "PPpp")}</Text>
          </Box>
          <Box display="flex" alignItems="center" spaceX="1">
            <Hourglass />
            <Text>Goal duration {goalSearchResult.duration} days</Text>
          </Box>
          <Badge>{goalSearchResult.userCount} people joined</Badge>
        </VStack>
      </Card.Body>
      <Card.Footer pb="0">
        <StyledButton
          onClick={async () =>
            await handleCreateGoalProgress(goalSearchResult.objectID)
          }
          disabled={goalSearchResult.joined}
          loading={isCreatingGoalProgress}
          loadingText="Joining..."
        >
          {!goalSearchResult.joined ? "Join Goal" : "Joined"}
        </StyledButton>
      </Card.Footer>
    </Card.Root>
  );
};

export default GoalSearchResult;
