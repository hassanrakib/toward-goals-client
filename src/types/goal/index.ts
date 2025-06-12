import { IGoalProgress } from "../progress";

export interface IGoal {
  _id: string;
  title: string;
  image?: string;
  creator: string;
  admins: string[];
  users: string[];
  userLimit: number;
  startDate: string;
  duration: number;
}

export type GoalCreationData = Pick<
  IGoal,
  "title" | "userLimit" | "duration" | "startDate"
>;

type GoalSearchResult = Omit<IGoal, "_id" | "creator" | "admins" | "users"> & {
  userCount: number;
  startDate: number;
};

export interface TransformedGoalSearchResult extends GoalSearchResult {
  joined: boolean;
}

export type MyJoinedGoal = Pick<IGoalProgress, "_id" | "goal">;
