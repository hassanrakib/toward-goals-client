export interface ISubgoal {
  title: string;
  duration: number;
  usageCount?: number;
}

export type SubgoalCreationData = Omit<ISubgoal, "usageCount"> & { goalId: string };
