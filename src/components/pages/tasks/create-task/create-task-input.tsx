"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import TextExtension from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { extractDataFromDoc } from "@/utils/tiptap";
import {
  CustomDocument,
  CustomHeading,
  DeadlineMentionExtension,
  GoalMentionExtension,
  HabitMentionExtension,
  SubgoalMentionExtension,
} from "@/lib/tiptap-extensions";
import { useController, useFormContext } from "react-hook-form";
import { ICreateTaskFormValues } from "@/app/(home)/@auth/tasks/create-task/page";

const CreateTaskInput = () => {
  // character limit for the input
  const characterLimit = 280;

  // html field will hold html string data of tiptap editor
  const { field: html } = useController({
    name: "html",
  });

  // extracted field will hold extracted data from editor content
  const { field: extracted } = useController({ name: "extracted" });

  // get all the hook form errors
  const {
    formState: {
      errors: { extracted: extractedFieldError },
    },
  } = useFormContext<ICreateTaskFormValues>();

  // editor config
  const editor = useEditor({
    // initial content at the time of mounting the editor
    content: html.value,
    immediatelyRender: false,
    extensions: [
      // custom document extension to force strict structure of 'heading paragraph',
      // heading means heading node and paragraph means paragraph node
      CustomDocument,
      CustomHeading.configure({
        HTMLAttributes: {
          class: "task-title",
        },
        levels: [2],
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "task-details",
        },
      }),
      TextExtension,
      Placeholder.configure({
        placeholder: ({ node }) => {
          // for the heading show this placeholder
          if (node.type.name === "heading") {
            return "# Write your task title here";
          }

          // if node is not heading then it is a paragraph
          // show this placeholder for the paragraph
          return "Type @goal, @subgoal, @habit & @deadline to select every one of these to create the task";
        },
        includeChildren: true,
        showOnlyCurrent: false,
        showOnlyWhenEditable: true,
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
      // these extensions are custom made
      // GoalMentionExtension works with inserting goalMention type node in the doc
      GoalMentionExtension,
      SubgoalMentionExtension,
      HabitMentionExtension,
      DeadlineMentionExtension,
    ],
    // this runs whenever the content of the editor changes
    onUpdate({ editor }) {
      // extract data from the editor top node => doc node
      const extractedData = extractDataFromDoc(editor.state.doc);

      // tiptap editor content in html string format
      const htmlString = editor.getHTML();

      // update the hook form html & extracted field
      html.onChange(htmlString);
      extracted.onChange(extractedData);
    },
  });

  // character usage percentage
  const characterUsagePercentage = editor
    ? Math.round(
        (100 / characterLimit) * editor.storage.characterCount.characters()
      )
    : 0;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        borderStyle="solid"
        borderWidth="thin"
        borderColor="bg.emphasized"
        p="3"
        rounded="xl"
        overflow="hidden"
        mb="2"
      >
        {/* editor where the user will write */}
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
      {/* show title required error if title is not provided */}
      {/* or show error to mention required mentions if any other field found (except 'title') in the extractedFieldError */}
      {/* or return null */}
      {extractedFieldError?.title ? (
        <Text color="red.700">{extractedFieldError.title.message}</Text>
      ) : Object.keys(extractedFieldError || {}).some(
          (key) => key !== "title"
        ) ? (
        <Text color="red.700">
          Please mention goal, subgoal, habit & deadline by typing @goal,
          @subgoal, @habit & @deadline
        </Text>
      ) : null}
    </>
  );
};

export default CreateTaskInput;
