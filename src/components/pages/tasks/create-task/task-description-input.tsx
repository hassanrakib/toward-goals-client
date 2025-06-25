"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import TextExtension from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { extractDataFromDoc } from "@/utils/tiptap";
import {
  CustomDocument,
  DeadlineMentionExtension,
  GoalMentionExtension,
  HabitMentionExtension,
  SubgoalMentionExtension,
} from "@/lib/tiptap-extensions";
import { FieldError, useController, useFormContext } from "react-hook-form";
import { ICreateTaskFormValues } from "./create-task-form";
import { getHookFormError } from "@/utils/form";
import { useEffect } from "react";

const TaskDescriptionInput = ({
  isTaskCreationSuccessful,
}: {
  isTaskCreationSuccessful: boolean;
}) => {
  // character limit for the input
  const characterLimit = 300;

  // json field will hold json string data of tiptap editor
  const { field: json } = useController<ICreateTaskFormValues, "json">({
    name: "json",
  });

  // extracted field will hold extracted data from editor content
  const { field: extracted } = useController<
    ICreateTaskFormValues,
    "extracted"
  >({ name: "extracted" });

  // get all the hook form errors
  const {
    formState: {
      errors: createTaskFormErrors,
      errors: { extracted: extractedFieldsError },
    },
  } = useFormContext<ICreateTaskFormValues>();

  // assign the first field error of extractedFieldsError
  let extractedFieldError: FieldError | undefined;

  // if error happens for extracted fields
  if (extractedFieldsError) {
    // get the first field from error fields
    const firstErrorField = Object.keys(extractedFieldsError)[0];

    // assign the extractedFieldError to the first error field's FieldError object
    extractedFieldError = getHookFormError(
      createTaskFormErrors,
      `extracted.${firstErrorField}`
    );
  }

  // editor config
  const editor = useEditor({
    // initial content at the time of mounting the editor
    content: json.value,
    // To suppress Tiptap error: SSR has been detected,
    // please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
    immediatelyRender: false,
    // Extensions enhance Tiptap by adding new capabilities to the editor
    extensions: [
      // CustomDocument node is home to all other nodes
      // it can only take one paragraph node within
      CustomDocument,
      // Paragraph node renders paragraph <p></p>
      Paragraph.configure({
        // class attribute will be added to the rendered html only
        HTMLAttributes: {
          class: "task-description-global-css",
        },
      }),
      // Text node renders plain text
      TextExtension,
      // show a placeholder inside the editor
      Placeholder.configure({
        // placeholder text
        placeholder:
          "Describe your task and mention #goal, #subgoal, #habit and #deadline as needed...",
        // Show placeholder only when editor is editable
        showOnlyWhenEditable: true,
      }),
      // CharacterCount extension handles character count
      CharacterCount.configure({
        limit: characterLimit,
      }),
      // these extensions are custom made
      // GoalMentionExtension works with inserting "goalMention" type node in the doc
      GoalMentionExtension,
      SubgoalMentionExtension,
      HabitMentionExtension,
      DeadlineMentionExtension,
    ],
    // this 'update' event listener runs whenever the content of the editor changes
    onUpdate({ editor }) {
      // extract data from the editor top node => doc node
      // editor.state.doc returns ProseMirror document node
      const extractedData = extractDataFromDoc(editor.state.doc);

      // tiptap editor content in json object format
      const jsonObject = editor.getJSON();

      // update the hook form json & extracted field
      json.onChange(jsonObject);
      extracted.onChange(extractedData);
    },
  });

  useEffect(() => {
    // clear the tiptap editor content
    if (isTaskCreationSuccessful && editor) {
      editor.commands.clearContent();
    }
  }, [editor, isTaskCreationSuccessful]);

  // character usage percentage
  const characterUsagePercentage = editor
    ? Math.round(
        (100 / characterLimit) * editor.storage.characterCount.characters()
      )
    : 0;

  return (
    <VStack alignItems="stretch">
      <VStack
        alignItems="stretch"
        borderStyle="solid"
        borderWidth="thin"
        borderColor={extractedFieldError ? "red.600" : "bg.emphasized"}
        p="3"
        rounded="xl"
      >
        {/* editor wrapper */}
        <EditorContent
          editor={editor}
          className="task-description-input-global-css"
        />
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
      </VStack>
      {/* show error here for extractedFieldsError */}
      <Text fontSize="xs" fontWeight="medium" color="red.600">
        {extractedFieldError?.message}
      </Text>
    </VStack>
  );
};

export default TaskDescriptionInput;
