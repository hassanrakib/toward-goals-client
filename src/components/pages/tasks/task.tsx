import { Avatar } from "@/components/ui/avatar";
import { Prose } from "@/components/ui/prose";
import { ITask } from "@/types/task";
import { Card, HStack, Stack, Text } from "@chakra-ui/react";

const Task = ({ task }: { task: ITask }) => {
  // destructure necessary props
  const { description } = task;
  return (
    <Card.Root maxW="sm">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar
            src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
            name="User"
          />
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              @natefoss
            </Text>
            <Text color="fg.muted" textStyle="sm">
              2h ago
            </Text>
          </Stack>
        </HStack>
        <Card.Description as="div">
          {/* description is an html string */}
          {/* Prose is used to style remote HTML content */}
          <Prose>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Prose>
        </Card.Description>
      </Card.Body>
      {/* add footer here */}
    </Card.Root>
  );
};

export default Task;
