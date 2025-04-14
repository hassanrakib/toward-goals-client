import { IGoal } from "../goal";
import { IHabit } from "../habit";
import { ISubgoal } from "../subgoal";
import { IUser } from "../user";

export interface ITask {
  _id: string;
  user: IUser;
  goal: IGoal;
  subgoal: ISubgoal;
  habit: IHabit;
  title: string;
  completedUnits: number;
  milestones: string[];
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
  deadline: string;
};
