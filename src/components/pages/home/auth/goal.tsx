import StyledPopover from "@/components/derived-ui/styled-popover";
import { IGoalProgress } from "@/types/progress";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { ChartNoAxesColumnDecreasing, Plus } from "lucide-react";
import SeeProgressLinks from "./see-progress-links";
import CreateProgressLinks from "./create-progress-links";

export default function Goal({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) {
  const { goal } = goalProgress;

  return (
    // a card with image in the background
    <Box
      position="relative"
      w="250px"
      h="300px"
      borderRadius="xl"
      overflow="hidden"
      bgImg={`url(${goal.image ? goal.image : "/images/goal-card-background.png"})`}
      backgroundSize="cover"
      backgroundPosition="top"
      boxShadow="lg"
    >
      {/* Top Right Icons */}
      <Flex position="absolute" top="4" right="4" gap="2">
        {/* see progress links: goal progress, subgoal progress, etc... */}
        <StyledPopover
          triggerElement={
            <IconButton size="sm" variant="subtle" colorPalette="yellow">
              <ChartNoAxesColumnDecreasing />
            </IconButton>
          }
          positioning={{ placement: "bottom-end" }}
          maxW="150px"
        >
          <SeeProgressLinks goalId={goal._id} />
        </StyledPopover>
        {/* links to create: subgoals, habits, tasks */}
        <StyledPopover
          triggerElement={
            <IconButton size="sm" variant="outline" colorPalette="yellow">
              <Plus />
            </IconButton>
          }
          positioning={{ placement: "bottom-end" }}
          maxW="150px"
        >
          <CreateProgressLinks goalId={goal._id} />
        </StyledPopover>
      </Flex>

      {/* Bottom Center Title with Glassmorphism */}
      <Box
        position="absolute"
        bottom="4"
        left="4"
        right="4"
        p="4"
        borderRadius="3xl"
        bg="rgba(255, 255, 255, 0.7)"
        backdropFilter="blur(12px)"
        fontWeight="bold"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="semibold">
          {goal.title}
        </Text>
      </Box>
    </Box>
  );
}
