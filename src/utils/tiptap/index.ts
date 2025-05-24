import { Node } from "@tiptap/pm/model";
import { Mention } from "@tiptap/extension-mention";
import { SuggestionProps } from "@tiptap/suggestion";
import { ComponentType } from "react";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";

export function makeMentionExtension({
  name,
  Component,
}: {
  name: string;
  Component: ComponentType<SuggestionProps>;
}) {
  return Mention.extend({
    // name of the extension
    name,
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
      //allow any prefix character before suggestion char "@"
      allowedPrefixes: null,
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
          // Called when the suggestion data (query, items, etc) or cursor position updates
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
            reactRenderer.destroy();
            if (popup.state.isDestroyed) {
              return;
            }
            popup.destroy();
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
              // props are sent by command at the time of selection
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

export function extractDataFromDoc(doc: Node) {
  // put the mention nodes id attribute here from the doc
  // and title text from the heading node
  const extracted = {
    title: "",
    goalId: "",
    subgoalId: "",
    habitId: "",
    deadline: "",
  };

  // go through all the nodes of the doc and if any type of mention node is found
  // add the mention nodes id in the mentions
  doc.descendants((node) => {
    if (node.type.name === "goalMention") {
      extracted.goalId = node.attrs.id;
    } else if (node.type.name === "subgoalMention") {
      extracted.subgoalId = node.attrs.id;
    } else if (node.type.name === "habitMention") {
      extracted.habitId = node.attrs.id;
    } else if (node.type.name === "deadlineMention") {
      extracted.deadline = node.attrs.id;
    } else if (node.type.name === "heading") {
      extracted.title = node.textContent;
    }
  });

  // return extracted data
  return extracted;
}
