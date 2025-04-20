import { Node } from "@tiptap/pm/model";

export function getMentionsFromDoc(doc: Node) {
  // put the mentions id attribute here from the doc
  const mentions = {
    goalMention: "",
    subgoalMention: "",
    habitMention: "",
    deadlineMention: "",
  };

  // go through all the nodes of the doc and if any type of mention node is found
  // add the mention nodes id in the mentions
  doc.descendants((node) => {
    if (node.type.name === "goalMention") {
      mentions.goalMention = node.attrs.id;
    } else if (node.type.name === "subgoalMention") {
      mentions.subgoalMention = node.attrs.id;
    } else if (node.type.name === "habitMention") {
      mentions.habitMention = node.attrs.id;
    } else if (node.type.name === "deadlineMention") {
      mentions.deadlineMention = node.attrs.id;
    }
  });

  // return mentions
  return mentions;
}
