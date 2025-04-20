import { DeadlineMention } from "@/components/pages/tasks/create-task/deadline-mention";
import { GoalMentionList } from "@/components/pages/tasks/create-task/goal-mention-list";
import { HabitMentionList } from "@/components/pages/tasks/create-task/habit-mention-list";
import { SubgoalMentionList } from "@/components/pages/tasks/create-task/subgoal-mention-list";
import { makeMentionExtension } from "@/utils/tiptap";
import { Node } from "@tiptap/core";

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

export const CustomDocument = Node.create({
  name: "doc",
  topNode: true,

  // This enforces the exact content structure
  content: "heading paragraph",
});
