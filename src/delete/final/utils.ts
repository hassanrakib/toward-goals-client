import { Node } from "@tiptap/pm/model";

export function getMentionsFromDoc(doc: Node) {
  // put the mentions here
  const mentions = {
    goalMention: "",
    subgoalMention: "",
  };

  // go through all the nodes of the doc and if any type of mention node is found
  // add the mention in mentions
  doc.descendants((node) => {
    if (node.type.name === "goalMention") {
      mentions.goalMention = node.attrs.id;
    } else if (node.type.name === "subgoalMention") {
      mentions.subgoalMention = node.attrs.id;
    }
  });

  // return mentions
  return mentions;
}
