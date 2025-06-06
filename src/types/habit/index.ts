import { IHabitProgress } from "../progress";

export enum HabitUnitType {
  "Custom" = "Custom",
  "Time" = "Time",
}

export enum HabitUnitNameForTime {
  "Minute" = "Minute",
}

export type HabitUnitName = HabitUnitNameForTime | string;

export interface IHabitUnit {
  _id: string;
  type: HabitUnitType;
  name: HabitUnitName;
  usageCount?: number;
}

export type HabitUnitCreationData = Omit<IHabitUnit, "_id" | "usageCount"> & {
  goalId: string;
};

export interface IHabitDifficulties {
  mini: number;
  plus: number;
  elite: number;
}

export interface IHabit {
  _id: string;
  title: string;
  unit: IHabitUnit;
  usageCount?: number;
  difficulties: IHabitDifficulties;
}

export type HabitDifficultiesName = keyof IHabitDifficulties;

export type HabitCreationData = Omit<IHabit, "_id" | "unit" | "usageCount"> & {
  goalId: string;
  unit: string;
};

export type HabitOfAGoal = Pick<IHabitProgress, "_id" | "habit">;
