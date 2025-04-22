import { DeadlineMention } from "@/components/pages/tasks/create-task/deadline-mention";
import { GoalMentionList } from "@/components/pages/tasks/create-task/goal-mention-list";
import { HabitMentionList } from "@/components/pages/tasks/create-task/habit-mention-list";
import { SubgoalMentionList } from "@/components/pages/tasks/create-task/subgoal-mention-list";
import { makeMentionExtension } from "@/utils/tiptap";
import { Node } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";

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

// custom document node extension to enfore specific content structure
export const CustomDocument = Node.create({
  name: "doc",
  topNode: true,

  // This enforces the exact content structure
  content: "heading paragraph",
});

// custom heading node extension to set level attribute default to 2
export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      level: {
        default: 2,
      }
    }
  }
})