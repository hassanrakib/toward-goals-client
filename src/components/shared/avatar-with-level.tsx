import {
  Avatar as ChakraAvatar,
  Box,
  Circle,
  Float,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { getMyGoalProgressLevel } from "@/services/progress/goal-progress";

const AvatarWithLevel = async ({
  size,
  username,
  userImg,
  goalId,
}: {
  size?: ChakraAvatar.RootProps["size"];
  username: string;
  userImg?: string;
  goalId: string;
}) => {
  // get the level of the goal
  const goalProgressLevel = await getMyGoalProgressLevel(goalId);

  return (
    <Box position="relative">
      <Avatar size={size} name={username} src={userImg} />
      <Float placement="bottom-end" offset="1.5">
        <Circle size="5" bg="bg">
          <Text color="black" fontWeight="bold" fontSize="14px">
            {goalProgressLevel.data?.level}
          </Text>
        </Circle>
      </Float>
    </Box>
  );
};

export default AvatarWithLevel;
