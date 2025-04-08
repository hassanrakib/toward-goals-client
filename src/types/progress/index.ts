import { IGoal } from "../goal";
import { IHabit } from "../habit";
import { ILevel, IRequirementLevel } from "../level";
import { ISubgoal } from "../subgoal";

export interface IGoalProgress {
  _id: string;
  user: string;
  goal: IGoal;
  level: ILevel;
  points?: number;
  totalMiniCompletion: number;
  totalPlusCompletion: number;
  totalEliteCompletion: number;
  workStreak: { current: number; total: number };
  skippedDays?: number;
  todosDeadlines?: { missed: number; met: number };
  analytics: {
    consistency: { percent?: number; level: IRequirementLevel };
    deepFocus: { percent?: number; level: IRequirementLevel };
    commitment: { percent?: number; level: IRequirementLevel };
  };
  isCompleted?: boolean;
}

export type GoalProgressCreationData = { goal: string };

export interface ISubgoalProgress {
  user: string;
  goal: string;
  subgoal: ISubgoal;
  keyMilestones?: string[];
  reward?: string;
  isCompleted?: boolean;
  isRewarded?: boolean;
}

export type SubgoalProgressCreationData = { goal: string; subgoal: string };

export interface IHabitProgress {
  user: string;
  goal: string;
  habit: IHabit;
  totalUnitCompleted?: number;
  miniCompletion?: number;
  plusCompletion?: number;
  eliteCompletion?: number;
}

export type HabitProgressCreationData = { goal: string; habit: string };
