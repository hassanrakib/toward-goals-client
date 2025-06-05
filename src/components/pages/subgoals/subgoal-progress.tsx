import { Alert } from "@/components/ui/alert";
import { ISubgoalProgress } from "@/types/progress";
import { Box, Card, Heading, List, Stack, Text } from "@chakra-ui/react";
import { addDays, format } from "date-fns";
import { CircleCheck } from "lucide-react";
import SubgoalCompletedStatus from "./subgoal-completed-status";

const SubgoalProgress = ({
  subgoalProgress,
}: {
  subgoalProgress: ISubgoalProgress;
}) => {
  // destructure
  const {
    subgoal: { title, duration },
    keyMilestones,
    createdAt,
  } = subgoalProgress;

  return (
    <Card.Root position="relative">
      {/* Completed or  Mark Complete */}
      <Box position="absolute" right="2" top="2">
        <SubgoalCompletedStatus subgoalProgress={subgoalProgress} />
      </Box>
      <Card.Header gap="unset">
        <Heading size="xl">{title}</Heading>
        <Text fontSize="sm" color="fg.muted">
          Ends on {format(addDays(createdAt, duration), "PPpp")}
        </Text>
      </Card.Header>
      <Card.Body>
        <Stack gap="1">
          <Text>Key Milestones:</Text>
          {keyMilestones.length ? (
            <List.Root gap="2" variant="plain" align="center">
              {keyMilestones.map((milestone, index) => (
                <List.Item key={index}>
                  <List.Indicator asChild color="green.500">
                    <CircleCheck />
                  </List.Indicator>
                  {milestone}
                </List.Item>
              ))}
            </List.Root>
          ) : (
            <Alert
              size="sm"
              variant="subtle"
              status="info"
              title="No milestones added!"
              maxW="sm"
            />
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default SubgoalProgress;
