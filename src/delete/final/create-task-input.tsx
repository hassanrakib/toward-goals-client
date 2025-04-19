"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TextExtension from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import "./styles.css";
import {
  GoalMentionExtension,
  SubgoalMentionExtension,
} from "./make-mention-extension";
import { getMentionsFromDoc } from "./utils";

const CreateTaskInput = () => {
  // character limit for the input
  const characterLimit = 280;

  // editor config
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      TextExtension,
      CharacterCount.configure({
        limit: characterLimit,
      }),
      GoalMentionExtension,
      SubgoalMentionExtension,
    ],
    // this runs whenever the content of the editor changes
    onUpdate({ editor }) {
      // editor has a prop called 'storage' that has access
      // to all the extensions storage
      const goalIdInExtensionStorage: string =
        editor.storage.goalMention.goalId;
      const subgoalIdInExtensionStorage: string =
        editor.storage.subgoalMention.subgoalId;

      // get all the mentions within the doc
      const mentionsInDoc = getMentionsFromDoc(editor.state.doc);

      // if goalMention node is not found in editor but goalId is found in goalMention extension storage
      if (!mentionsInDoc.goalMention && goalIdInExtensionStorage) {
        // clear the goalId because editor doesn't have goalMention node
        editor.storage.goalMention.goalId = "";
      } else if (!mentionsInDoc.subgoalMention && subgoalIdInExtensionStorage) {
        editor.storage.subgoalMention.subgoalId = "";
      }
    },
    content: `
      <p>
        Got something to get done?
      </p>
    `,
  });

  // character usage percentage
  const characterUsagePercentage = editor
    ? Math.round(
        (100 / characterLimit) * editor.storage.characterCount.characters()
      )
    : 0;

  return (
    <Box bgColor="bg" maxW="xl" p="3" rounded="2xl">
      <Text fontSize="md" mb="2" fontWeight="medium">
        Create Task
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        borderStyle="solid"
        borderWidth="thin"
        borderColor="bg.emphasized"
        p="2"
        rounded="xl"
        height="140px"
        overflow="hidden"
      >
        <EditorContent editor={editor} className="create-task-input" />
        {/* shows character count against character limit */}
        {editor && (
          <Flex
            alignItems="center"
            spaceX="1"
            fontSize="sm"
            color={
              editor.storage.characterCount.characters() === characterLimit
                ? "orange.400"
                : "gray.600"
            }
          >
            <Icon
              size="sm"
              color={
                editor.storage.characterCount.characters() === characterLimit
                  ? "orange.400"
                  : "purple.600"
              }
              asChild
            >
              <svg viewBox="0 0 20 20">
                <circle r="10" cx="10" cy="10" fill="#e9ecef" />
                <circle
                  r="5"
                  cx="10"
                  cy="10"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={`calc(${characterUsagePercentage} * 31.4 / 100) 31.4`}
                  transform="rotate(-90) translate(-20)"
                />
                <circle r="6" cx="10" cy="10" fill="white" />
              </svg>
            </Icon>
            <Text>
              {editor.storage.characterCount.characters()} / {characterLimit}{" "}
              characters
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default CreateTaskInput;
