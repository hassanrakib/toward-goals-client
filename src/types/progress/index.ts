import { IGoal } from "../goal";

export interface IGoalProgress {
  user: string;
  goal: IGoal;
  level: string;
  points?: number;
  totalMiniCompletion?: number;
  totalPlusCompletion?: number;
  totalEliteCompletion?: number;
  workStreak?: { current: number; total: number };
  skippedDays?: number;
  todosDeadlines?: { missed: number; met: number };
  analytics: {
    consistency: { percent?: number; level: string };
    deepFocus: { percent?: number; level: string };
    commitment: { percent?: number; level: string };
  };
  isCompleted?: boolean;
}
