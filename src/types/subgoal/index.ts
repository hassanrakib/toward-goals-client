import { ISubgoalProgress } from "../progress";

export interface ISubgoal {
  _id: string;
  title: string;
  duration: number;
  usageCount?: number;
}

export type SubgoalCreationData = Omit<ISubgoal, "_id" | "usageCount"> & {
  goalId: string;
};

export type SubgoalOfAGoal = Pick<ISubgoalProgress, "_id" | "subgoal">;
