import { IGoal } from "../goal";
import { IHabit } from "../habit";
import { ILevel, IRequirementLevel } from "../level";
import { ISubgoal } from "../subgoal";
import { IUser } from "../user";

export interface IGoalProgress {
  _id: string;
  user: IUser;
  goal: IGoal;
  level: ILevel;
  points: number;
  totalMiniCompletion: number;
  totalPlusCompletion: number;
  totalEliteCompletion: number;
  workStreak: { current: number; streakDates: Date[] };
  dayStats: { skippedDays: number; workedDays: number };
  todosDeadlines: { missed: number; met: number };
  analytics: {
    consistency: { percent: number; level: IRequirementLevel };
    deepFocus: { percent: number; level: IRequirementLevel };
    commitment: { percent: number; level: IRequirementLevel };
  };
  isCompleted: boolean;
}

export type GoalProgressCreationData = { goal: string };
export type GoalProgressUpdateData = { goalProgressId: string; isCompleted: true };

export interface ISubgoalProgress {
  _id: string;
  user: string;
  goal: IGoal;
  subgoal: ISubgoal;
  keyMilestones: string[];
  reward?: string;
  isCompleted: boolean;
  isRewarded?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SubgoalProgressCreationData = { goal: string; subgoal: string };

export type SubgoalProgressUpdateData = {
  subgoalProgressId: string;
  goalId: string;
} & Partial<Pick<ISubgoalProgress, "isCompleted" | "keyMilestones">>;

export interface IHabitProgress {
  _id: string;
  user: string;
  goal: IGoal;
  habit: IHabit;
  totalUnitCompleted: number;
  miniCompletion: number;
  plusCompletion: number;
  eliteCompletion: number;
}

export type HabitProgressCreationData = { goal: string; habit: string };
