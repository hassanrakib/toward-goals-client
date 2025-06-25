import { Node } from "@tiptap/pm/model";
import { Mention } from "@tiptap/extension-mention";
import { SuggestionProps } from "@tiptap/suggestion";
import { ComponentType } from "react";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { ICreateTaskFormValues } from "@/components/pages/tasks/create-task/create-task-form";

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
    // class attribute will be added to the rendered html by this extension
    HTMLAttributes: { class: "task-mention-global-css" },
    // customize the rendered html for mention extension => specifically the text inside <span> tag
    renderHTML({ options, node }) {
      return [
        "span",
        options.HTMLAttributes,
        `#${node.type.name}_${node.attrs.label}`,
      ];
    },
    // suggestion option config
    suggestion: {
      // # will trigger the suggestion inside editor
      char: "#",
      // if you didn’t assign a unique pluginKey,
      // and made multiple mention extensions using this utility,
      // they would all share the same default key, potentially causing state conflicts
      pluginKey: new PluginKey(name),
      // don't trigger the suggestion only at the start of a line
      startOfLine: false,
      //allow any prefix character before suggestion char "#"
      allowedPrefixes: null,
      // items to show in the suggestion popup
      // we are fetching data using rtk query in the popup component
      items: () => [],
      // render function decides what to render
      render: () => {
        // declare variables to store the ReactRenderer and Tippy.js popup instance
        // ReactRenderer is responsible for rendering react components inside editor
        let reactRenderer: ReactRenderer;
        let popup: Instance;

        return {
          // onStart will be triggered when user types suggestion char #
          onStart: (props) => {
            // A client rectangle (or client rect) is a DOMRect object that describes
            // the position and size of an element (query, like: '#goal')
            // relative to the viewport
            // This clientRect is then used to position the suggestion dropdown (tippy popup)
            // relative to that character.
            if (!props.clientRect) {
              return;
            }
            // Create a ReactRenderer instance to render the suggestion component inside editor
            reactRenderer = new ReactRenderer(Component, {
              // The initial props object {query, command} to be passed to your Component
              props,
              // This is a required option for ReactRenderer, because it needs access to the Tiptap editor instance to attach itself to the editor’s lifecycle
              editor: props.editor,
            });
            // Create a Tippy.js popup to show the suggestion dropdown
            popup = tippy(document.body, {
              // Position the popup near the suggestion query
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
            // if no clientRect found or popup is already destroyed
            // don't do anything
            if (!props.clientRect || popup.state.isDestroyed) {
              return;
            }
            // when the suggestion query or cursor position changes (like when you type more characters, or move the cursor)
            // the suggestion system needs to re-render the component with new props.
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
          // insert multiple node at the suggestion query position
          .insertContentAt(range, [
            {
              // insert a custom node such as "goalMention"
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
  const extracted: ICreateTaskFormValues["extracted"] = {
    goalId: "",
    subgoalId: "",
    habitId: "",
    deadline: "",
  };

  // go through all the descendant nodes of the doc node and if any type of mention node is found
  // add the mention nodes id in the mentions
  doc.descendants((node) => {
    // the name of node type & node attrs assigned inside
    // makeMentionExtension utitliy functions
    // Mention config => suggestion utility => command method
    if (node.type.name === "goal") {
      extracted.goalId = node.attrs.id;
    } else if (node.type.name === "subgoal") {
      extracted.subgoalId = node.attrs.id;
    } else if (node.type.name === "habit") {
      extracted.habitId = node.attrs.id;
    } else if (node.type.name === "deadline") {
      extracted.deadline = node.attrs.id;
    }
  });

  // return extracted data
  return extracted;
}
