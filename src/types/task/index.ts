import { z } from "zod";
import { IHabit } from "../habit";
import { ISubgoal } from "../subgoal";
import { IUser } from "../user";
import { TiptapDocSchema } from "@/schemas/task";

export interface ITimeSpan {
  _id: string;
  task: string;
  startTime: Date;
  endTime: Date;
}

export type TimeSpanCreationData = {
  task: string;
  startTime: string;
  endTime: string;
};

export interface ITask {
  _id: string;
  user: IUser;
  goal: string;
  subgoal: ISubgoal;
  habit: IHabit;
  title: string;
  // tiptap json doc type
  description: z.infer<typeof TiptapDocSchema>;
  completedUnits: number;
  images?: string[];
  deadline: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskCreationData = {
  goal: string;
  subgoal: string;
  habit: string;
  title: string;
  // tiptap json object
  description: unknown;
  deadline: string;
};

export type TaskUpdateData = {
  taskId: string;
  newCompletedUnits?: number;
  isCompleted?: true;
};
