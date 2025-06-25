import { isFuture, isToday } from "date-fns";
import { z } from "zod";

// Tiptap JSON document validation
// Text node schema
const TextNodeSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

// Mention node schema
const MentionNodeSchema = z.object({
  type: z.enum(["goal", "subgoal", "habit", "deadline"]),
  attrs: z.object({
    id: z.string(),
    label: z.string(),
  }),
});

// Paragraph node schema: can have text or mention nodes
export const ParagraphNodeSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(z.union([TextNodeSchema, MentionNodeSchema])),
});

// Document schema: must have exactly one paragraph
export const TiptapDocSchema = z.object({
  type: z.literal("doc"),
  content: z.tuple([ParagraphNodeSchema]),
});

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(60, { message: "Title cannot exceed 60 characters" }),
  json: TiptapDocSchema,
  extracted: z.object({
    goalId: z
      .string()
      .min(1, { message: "Please select goal writing @goal" })
      .trim(),
    subgoalId: z
      .string()
      .min(1, { message: "Please select subgoal writing @subgoal" })
      .trim(),
    habitId: z
      .string()
      .min(1, { message: "Please select habit writing @habit" })
      .trim(),
    deadline: z
      .string()
      .min(1, { message: "Please select deadline writing @deadline" })
      .datetime()
      .refine((date) => isFuture(new Date(date)), {
        message: "Deadline must be in the future",
      })
      .refine((date) => isToday(new Date(date)), {
        message: "Deadline must not exceed today.",
      }),
  }),
});
