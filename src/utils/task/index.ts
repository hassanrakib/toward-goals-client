import { ITask } from "@/types/task";
import { TiptapMentionExtensionNames } from "@/types/tiptap";
import Document from "@tiptap/extension-document";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import TextExtension from "@tiptap/extension-text";
import { generateHTML } from "@tiptap/html";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInYears,
} from "date-fns";

export const getTimeAgo = (time: Date) => {
  const timeNow = new Date();

  const years = differenceInYears(timeNow, time);
  if (years > 0) return `${years}y ago`;

  const days = differenceInDays(timeNow, time);
  if (days > 0) return `${days}d ago`;

  const hours = differenceInHours(timeNow, time);
  if (hours > 0) return `${hours}h ago`;

  const minutes = differenceInMinutes(timeNow, time);
  if (minutes > 0) return `${minutes}m ago`;

  return "just now";
};

// create different mention extension for converting json to html
// same as makeMentionExtension util but opted out some other unnecessary configuration
// extension name has to be same to the tiptap json creation time (at the time of creating task description => used names for mention extensions) =>
// to convert same name mention node from json to html
export const makeMentionExtensionToConvertJSONToHTML = (
  name: TiptapMentionExtensionNames
) => {
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
  });
};

// return html string by converting json object
export const generateHTMLFromJSON = (
  description: ITask["description"]
): string => {
  // if json is not valid error will be thrown by generateHTML
  try {
    // convert tiptap json document in description to plain html
    return generateHTML(
      description,
      // list of extensions needed to convert json to html
      // almost same as tiptap editor extensions in task-description-input.tsx
      [
        // for the document node
        Document,
        // for the paragraph node
        Paragraph.configure({
          // class attribute will be added to the rendered html only
          HTMLAttributes: {
            class: "task-description-global-css",
          },
        }),
        // Text node renders plain text
        TextExtension,
        // mention extensions to convert different types of mentions to html
        makeMentionExtensionToConvertJSONToHTML(
          TiptapMentionExtensionNames.goal
        ),
        makeMentionExtensionToConvertJSONToHTML(
          TiptapMentionExtensionNames.subgoal
        ),
        makeMentionExtensionToConvertJSONToHTML(
          TiptapMentionExtensionNames.habit
        ),
        makeMentionExtensionToConvertJSONToHTML(
          TiptapMentionExtensionNames.deadline
        ),
      ]
    );
  } catch (error) {
    console.log(error);
    return `<p class="task-description-broken-global-css">temp message: project is in development mode. because stored data type changed, description is unavailable for this task</p>`;
  }
};
