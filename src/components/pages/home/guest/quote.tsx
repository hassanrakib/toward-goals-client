import { Avatar } from "@/components/ui/avatar";
import { Blockquote, Center, Float, HStack, Span } from "@chakra-ui/react";

export default function Quote() {
  return (
    <Center pb="6" maxW="4xl" mx="auto">
    <Blockquote.Root bgColor="bg" padding="8" colorPalette="yellow">
      <Float placement="bottom-end" offset="10">
        <Blockquote.Icon opacity="0.4" boxSize="10" rotate="180deg" />
      </Float>
      <Blockquote.Content cite="James Clear">
        You should be far more concerned with your current trajectory than with your current results. What matters is whether your habits are putting you on the path toward success, even if you aren&apos;t seeing immediate results.
      </Blockquote.Content>
      <Blockquote.Caption>
        <cite>
          <HStack mt="2" gap="3">
            <Avatar name="James" />
            <Span fontWeight="medium">James Clear, Atomic Habits</Span>
          </HStack>
        </cite>
      </Blockquote.Caption>
    </Blockquote.Root>
    </Center>
  );
}
