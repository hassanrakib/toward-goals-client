import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { Mention } from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";
import { SuggestionProps } from "@tiptap/suggestion";
import { ComponentType } from "react";
import { GoalMentionList } from "./GoalMentionList";
import { SubgoalMentionList } from "./SubgoalMentionList";

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
    name,
    addStorage() {
      return initialStorage;
    },
  }).configure({
    HTMLAttributes: { class: `mention ${name}` },
    suggestion: {
      char: "@",
      pluginKey: new PluginKey(name),
      startOfLine: false,
      allowSpaces: true,
      items: () => [], // fallback
      render: () => {
        let reactRenderer: ReactRenderer;
        let popup: Instance;

        return {
          onStart: (props) => {
            if (!props.clientRect) {
              return;
            }

            reactRenderer = new ReactRenderer(Component, {
              props,
              editor: props.editor,
            });

            popup = tippy(document.body, {
              getReferenceClientRect: props.clientRect as () => DOMRect,
              appendTo: () => document.body,
              content: reactRenderer.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start",
            });
          },
          onUpdate(props) {
            reactRenderer.updateProps(props);
            if (!props.clientRect) {
              return;
            }
            popup.setProps({
              getReferenceClientRect: props.clientRect as () => DOMRect,
            });
          },
          onExit() {
            popup.destroy();
            reactRenderer.destroy();
          },
        };
      },
      command: ({ editor, range, props }) => {
        editor
          .chain()
          .focus()
          .insertContentAt(range, [
            {
              type: name,
              attrs: props,
            },
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
