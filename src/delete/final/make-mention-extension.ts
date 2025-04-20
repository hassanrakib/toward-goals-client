import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { Mention } from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";
import { SuggestionProps } from "@tiptap/suggestion";
import { ComponentType } from "react";
import { GoalMentionList } from "./GoalMentionList";
import { SubgoalMentionList } from "./SubgoalMentionList";
import { HabitMentionList } from "./habit-mention-list";
import { DeadlineMention } from "./deadline-mention";

function makeMentionExtension({
  name,
  initialStorage,
  Component,
}: {
  name: string;
  initialStorage: Record<string, string>;
  Component: ComponentType<SuggestionProps>;
}) {
  return Mention.extend({
    // name of the extension
    name,
    // extension storage
    addStorage() {
      return initialStorage;
    },
  }).configure({
    // class attribute will be added to the inserted node by this extension
    HTMLAttributes: { class: `mention ${name}` },
    // suggestion option config
    suggestion: {
      // @ will trigger the suggestion inside editor
      char: "@",
      pluginKey: new PluginKey(name),
      // don't trigger the suggestion only at the start of a line
      startOfLine: false,
      // allow spaces in the query
      allowSpaces: true,
      // items to show in the suggestion popup
      // we are fetching data using rtk query in the popup component
      items: () => [],
      // render function decides what to render
      render: () => {
        // declare variables to store the ReactRenderer and Tippy.js popup instance
        let reactRenderer: ReactRenderer;
        let popup: Instance;

        return {
          // onStart will be triggered when user starts writing after suggestion char @
          onStart: (props) => {
            // If there's no reference position (cursor position), do nothing
            if (!props.clientRect) {
              return;
            }
            // Create a ReactRenderer instance to render the suggestion component
            reactRenderer = new ReactRenderer(Component, {
              props,
              editor: props.editor,
            });
            // Create a Tippy.js popup to show the suggestion dropdown
            popup = tippy(document.body, {
              // Position the popup near the cursor
              getReferenceClientRect: props.clientRect as () => DOMRect,
              // Attach popup to the document body
              appendTo: () => document.body,
              // Rendered React component as content
              content: reactRenderer.element,
              // Show the popup immediately
              showOnCreate: true,
              // Allow interaction (clicks, hovers, etc.)
              interactive: true,
              // Don't auto-trigger; we control it manually
              trigger: "manual",
              // Position the popup below the trigger point
              placement: "bottom-start",
            });
          },
          // Called when the suggestion data or cursor position updates
          onUpdate(props) {
            reactRenderer.updateProps(props);
            // if no cursor position found or popup is already destroyed
            // don't do anything
            if (!props.clientRect || popup.state.isDestroyed) {
              return;
            }
            popup.setProps({
              getReferenceClientRect: props.clientRect as () => DOMRect,
            });
          },
          // Called when the suggestion should be closed
          onExit() {
            popup.destroy();
            reactRenderer.destroy();
          },
        };
      },
      // Called when user selects an item by sending command from the suggestion list
      command: ({ editor, range, props }) => {
        editor
          .chain()
          .focus()
          .insertContentAt(range, [
            {
              // insert a custom node such "goalMention"
              type: name,
              // pass the selected suggestion data as attributes
              attrs: props,
            },
            // add a space after the inserted mention node
            { type: "text", text: " " },
          ])
          .run();
      },
    },
  });
}

// mention extensions to show different suggestion component
export const GoalMentionExtension = makeMentionExtension({
  name: "goalMention",
  initialStorage: { goalId: "" },
  Component: GoalMentionList,
});

export const SubgoalMentionExtension = makeMentionExtension({
  name: "subgoalMention",
  initialStorage: { subgoalId: "" },
  Component: SubgoalMentionList,
});

export const HabitMentionExtension = makeMentionExtension({
  name: "habitMention",
  initialStorage: { habitId: "" },
  Component: HabitMentionList,
});

export const DeadlineMentionExtension = makeMentionExtension({
  name: "deadlineMention",
  initialStorage: { deadline: "" },
  Component: DeadlineMention,
});

// lib/tiptap/extensions/CustomDocument.ts
import { Node } from "@tiptap/core";

export const CustomDocument = Node.create({
  name: "doc",
  topNode: true,

  // This enforces the exact content structure
  content: "heading paragraph",
});
