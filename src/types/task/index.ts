import { IHabit } from "../habit";
import { ISubgoal } from "../subgoal";
import { IUser } from "../user";

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
  description: string;
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
  description: string;
  deadline: string;
};

export type TaskUpdateData = {
  taskId: string;
  newCompletedUnits?: number;
  isCompleted?: true;
};
