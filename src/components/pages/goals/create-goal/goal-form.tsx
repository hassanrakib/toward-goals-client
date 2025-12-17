import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { Card, Flex } from "@chakra-ui/react";

interface IFormValues {
  goalTitle: string;
}

interface GoalFormProps {
  onSubmit: (data: IFormValues) => void;
}

const GoalForm = (props : GoalFormProps) => {

  const defaultValues: IFormValues = {
    goalTitle: "",
  };


  const onSubmit = async (data: IFormValues) => {
    props.onSubmit(data);
  }

  return (
    <Flex justify="center" align="center">
      <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
        <Card.Header>
          <Card.Title fontSize="2xl">Create a Goal</Card.Title>
          <Card.Description>
            Remember this will be publicly visible.
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
          }}
        >
          <Card.Body>
              <StyledInput
                type="text"
                name="goalTitle"
                label="Goal Title"
                placeholder="Enter a descriptive goal title"
              />
          </Card.Body>
          <Card.Footer flexDir="column" alignItems="stretch">
            {/* submit button */}
            <SubmitButton
              isServerActionLoading={false}
            >
              Next
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
}

export default GoalForm;