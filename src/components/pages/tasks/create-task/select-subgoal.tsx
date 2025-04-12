import Alert from "@/components/derived-ui/alert";
import CheckboxCards from "@/components/derived-ui/checkbox-cards";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { IResponse } from "@/types/global";
import { ISubgoalProgress } from "@/types/progress";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

interface SelectSubgoalProps {
  selectedGoalId: string;
  subgoalsProgress: IResponse<ISubgoalProgress[]> | undefined;
  defaultSelectedSubgoal: string | undefined;
  isGettingSubgoalsProgress: boolean;
}

const SelectSubgoal = ({
  selectedGoalId,
  subgoalsProgress,
  defaultSelectedSubgoal,
  isGettingSubgoalsProgress,
}: SelectSubgoalProps) => {
  return (
    <CheckboxCards
      name="subgoalId"
      label="Select subgoal"
      defaultSelectedValue={
        defaultSelectedSubgoal ? [defaultSelectedSubgoal] : undefined
      }
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
        <CheckboxCard key={subgoal._id} label={subgoal.title} />
      ))}
    </CheckboxCards>
  );
};

export default SelectSubgoal;
