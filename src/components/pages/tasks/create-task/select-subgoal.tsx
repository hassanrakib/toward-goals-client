import Alert from "@/components/derived-ui/alert";
import RadioCards from "@/components/derived-ui/radio-cards";
import { RadioCardItem } from "@/components/ui/radio-card";
import { IResponse } from "@/types/global";
import { ISubgoalProgress } from "@/types/progress";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

interface SelectSubgoalProps {
  selectedGoalId: string;
  subgoalsProgress: IResponse<ISubgoalProgress[]> | undefined;
  isGettingSubgoalsProgress: boolean;
}

const SelectSubgoal = ({
  selectedGoalId,
  subgoalsProgress,
  isGettingSubgoalsProgress,
}: SelectSubgoalProps) => {

  // select a subgoal by default
  const defaultValue = subgoalsProgress?.data?.[0]?.subgoal._id;

  return (
    <RadioCards
      name="subgoalId"
      label="Select subgoal"
      defaultValue={defaultValue}
    >
      {/* if no goal selected show a message */}
      {!selectedGoalId && (
        <Alert status="info">Please select a goal first</Alert>
      )}
      {/* if loading subgoals */}
      {isGettingSubgoalsProgress && (
        <Alert showSpinner>Loading subgoals...</Alert>
      )}
      {/* if no incomplete subgoal found */}
      {subgoalsProgress?.data?.length === 0 && (
        <Alert status="error">
          No incomplete subgoal found!{" "}
          <ChakraLink color="blue.500" variant="underline" asChild>
            <NextLink href="/subgoals/create-subgoal">Create subgoal</NextLink>
          </ChakraLink>
        </Alert>
      )}
      {subgoalsProgress?.data?.map(({ subgoal }) => (
        <RadioCardItem
          key={subgoal._id}
          label={subgoal.title}
          value={subgoal._id}
        />
      ))}
    </RadioCards>
  );
};

export default SelectSubgoal;
