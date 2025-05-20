import { List, Text, VStack } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { Plus } from "lucide-react";

const progressLinks = [
  {
    label: "Subgoal",
    href: "/subgoals/create-subgoal",
  },
  {
    label: "Habit",
    href: "/habits/create-habit",
  },
  {
    label: "Task",
    href: "/tasks/create-task",
  },
];

export default function CreateProgressLinks() {
  return (
    <VStack align="stretch">
      <Text fontWeight="medium">Create:</Text>
      <List.Root variant="plain" align="center">
        {progressLinks.map((link) => (
          <List.Item key={link.href}>
            <List.Indicator asChild>
              <Plus size="12" />
            </List.Indicator>
            <ChakraLink color="blue.400" asChild>
              <NextLink href={`${link.href}`}>{link.label}</NextLink>
            </ChakraLink>
          </List.Item>
        ))}
      </List.Root>
    </VStack>
  );
}
