import { Alert } from "@/components/ui/alert";
import { ISubgoalProgress } from "@/types/progress";
import { Box, Card, Heading, List, Stack, Text } from "@chakra-ui/react";
import { CircleCheck } from "lucide-react";
import SubgoalCompletedStatus from "./subgoal-completed-status";
import DurationInfo from "@/components/shared/duration-info";
import { addDays, isAfter, isBefore } from "date-fns";
import { Tag } from "@/components/ui/tag";
import AddKeyMilestones from "./add-key-milestones";

const SubgoalProgress = ({
  subgoalProgress,
}: {
  subgoalProgress: ISubgoalProgress;
}) => {
  // destructure
  const {
    goal: {
      title: goalTitle,
      startDate: goalStartDate,
      duration: goalDuration,
    },
    subgoal: { title, duration: subgoalDuration },
    keyMilestones,
    createdAt: subgoalCreationDate,
    isCompleted,
  } = subgoalProgress;

  // get goal end date
  const goalEndDate = addDays(goalStartDate, goalDuration).toISOString();
  // get subgoal end date (subgoal end date can be greater than goal end date, see => backend create subgoal service)
  // if subgoal created before goal start date
  // subgoal end date will be goal start date + subgoal duration
  // otherwise subgoal creation date + subgoal duration
  const subgoalEndDate = isBefore(subgoalCreationDate, goalStartDate)
    ? addDays(goalStartDate, subgoalDuration).toISOString()
    : addDays(subgoalCreationDate, subgoalDuration).toISOString();

  return (
    <Card.Root position="relative">
      {/* Completed or  Mark Complete */}
      <Box position="absolute" right="2" top="2">
        <SubgoalCompletedStatus subgoalProgress={subgoalProgress} />
      </Box>
      <Card.Header gap="unset">
        <Heading size="xl">{title}</Heading>
        <Tag colorPalette="yellow" variant="outline">
          @goal {goalTitle}
        </Tag>
        {/* if subgoal created before goal startDate, startDate = goal startDate */}
        {/* if subgoal created after goal startDate, startDate = subgoal createdAt */}
        <DurationInfo
          startDate={
            isBefore(subgoalCreationDate, goalStartDate)
              ? goalStartDate
              : subgoalCreationDate
          }
          // if subogalEndDate is after goalEndDate pass goalEndDate
          // otherwise pass subgoalEndDate
          // see => backend => create subgoal service why subgoal end date can be greater
          endDate={
            isAfter(subgoalEndDate, goalEndDate) ? goalEndDate : subgoalEndDate
          }
          color="fg.muted"
          fontSize="xs"
          mt="2"
        />
      </Card.Header>
      <Card.Body>
        <Stack gap="1">
          <Text>Key Milestones:</Text>
          {/* show already added milestones */}
          <List.Root gap="1" variant="plain" align="center">
            {keyMilestones.map((milestone, index) => (
              <List.Item key={index} fontSize="14px" color="fg.muted">
                <List.Indicator asChild color="yellow.500">
                  <CircleCheck size={14} />
                </List.Indicator>
                {milestone}
              </List.Item>
            ))}
          </List.Root>
          {/* if subgoal is not completed and milestones added less than 5 */}
          {!isCompleted && keyMilestones.length < 5 && (
            <AddKeyMilestones subgoalProgress={subgoalProgress} />
          )}
          {/* if subgoal is completed and no milestones added */}
          {isCompleted && !keyMilestones.length && (
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
