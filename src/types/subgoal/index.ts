export interface ISubgoal {
  _id: string;
  title: string;
  duration: number;
  usageCount?: number;
}

export type SubgoalCreationData = Omit<ISubgoal, "_id" | "usageCount"> & {
  goalId: string;
};
