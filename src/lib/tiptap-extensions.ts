import { DeadlineMention } from "@/components/pages/tasks/create-task/deadline-mention";
import { GoalMentionList } from "@/components/pages/tasks/create-task/goal-mention-list";
import { HabitMentionList } from "@/components/pages/tasks/create-task/habit-mention-list";
import { SubgoalMentionList } from "@/components/pages/tasks/create-task/subgoal-mention-list";
import { makeMentionExtension } from "@/utils/tiptap";

// custom mention extensions to show different suggestion component
export const GoalMentionExtension = makeMentionExtension({
  name: "goalMention",
  Component: GoalMentionList,
});

export const SubgoalMentionExtension = makeMentionExtension({
  name: "subgoalMention",
  Component: SubgoalMentionList,
});

export const HabitMentionExtension = makeMentionExtension({
  name: "habitMention",
  Component: HabitMentionList,
});

export const DeadlineMentionExtension = makeMentionExtension({
  name: "deadlineMention",
  Component: DeadlineMention,
});