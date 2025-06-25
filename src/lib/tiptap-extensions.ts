import { DeadlineMention } from "@/components/pages/tasks/create-task/deadline-mention";
import { GoalMentionList } from "@/components/pages/tasks/create-task/goal-mention-list";
import { HabitMentionList } from "@/components/pages/tasks/create-task/habit-mention-list";
import { SubgoalMentionList } from "@/components/pages/tasks/create-task/subgoal-mention-list";
import { TiptapMentionExtensionNames } from "@/types/tiptap";
import { makeMentionExtension } from "@/utils/tiptap";
import Document from "@tiptap/extension-document";

// custom mention extensions to show different suggestion component
export const GoalMentionExtension = makeMentionExtension({
  name: TiptapMentionExtensionNames.goal,
  Component: GoalMentionList,
});

export const SubgoalMentionExtension = makeMentionExtension({
  name: TiptapMentionExtensionNames.subgoal,
  Component: SubgoalMentionList,
});

export const HabitMentionExtension = makeMentionExtension({
  name: TiptapMentionExtensionNames.habit,
  Component: HabitMentionList,
});

export const DeadlineMentionExtension = makeMentionExtension({
  name: TiptapMentionExtensionNames.deadline,
  Component: DeadlineMention,
});

// By default, Tiptap’s Document extension allows multiple block-level nodes like paragraphs, headings, etc.
// Override this by customizing the Document extension schema to limit its content to a single paragraph block, which itself can contain inline nodes (like text, mention, etc.)
export const CustomDocument = Document.extend({
  // schema changed to only contain a single paragraph
  content: "paragraph",
});
