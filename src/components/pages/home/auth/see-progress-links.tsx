import { PopoverActionTrigger } from "@/components/derived-ui/styled-popover";
import { List, Text, VStack } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { ChartNoAxesColumnDecreasing } from "lucide-react";
import NextLink from "next/link";

const progressLinks = [
  {
    label: "Goal",
    href: "/goals",
  },
  {
    label: "Subgoals",
    href: "/subgoals",
  },
  {
    label: "Habits",
    href: "/habits",
  },
  {
    label: "Tasks",
    href: "/tasks",
  },
];
export default function SeeProgressLinks({ goalId }: { goalId: string }) {
  return (
    <VStack align="stretch">
      <Text fontWeight="medium">See Progress:</Text>
      <List.Root variant="plain" align="center">
        {progressLinks.map((link) => (
          <List.Item key={link.href}>
            <List.Indicator asChild color="yellow.500">
              <ChartNoAxesColumnDecreasing size="16" />
            </List.Indicator>
            <PopoverActionTrigger>
              <ChakraLink asChild colorPalette="yellow" variant="underline">
                <NextLink href={`${link.href}?goalId=${goalId}`}>
                  {link.label}
                </NextLink>
              </ChakraLink>
            </PopoverActionTrigger>
          </List.Item>
        ))}
      </List.Root>
    </VStack>
  );
}
