export enum HabitUnitType {
  "Custom" = "Custom",
  "Time" = "Time",
}

export enum HabitUnitNameForTime {
  "Minute" = "Minute",
}

export type HabitUnitName = HabitUnitNameForTime | string;

export interface IHabitUnit {
  type: HabitUnitType;
  name: HabitUnitName;
  usageCount?: number;
}

export type HabitUnitCreationData = Pick<IHabitUnit, "type" | "name">;

export interface IHabitDifficulties {
  mini: number;
  plus: number;
  elite: number;
}

export interface IHabit {
  title: string;
  unit: string;
  usageCount?: number;
  difficulties: IHabitDifficulties;
}

export type HabitCreationData = Omit<IHabit, "usageCount">;
