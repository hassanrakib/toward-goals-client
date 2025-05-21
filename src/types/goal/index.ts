export interface IGoal {
  _id: string;
  title: string;
  image?: string;
  creator: string;
  admins: string[];
  users: string[];
  userLimit: number;
  startDate: Date;
  duration: number;
}

export type GoalCreationData = Pick<
  IGoal,
  "title" | "userLimit" | "duration"
> & { startDate: string };

type GoalSearchResult = Omit<IGoal, "_id" | "creator" | "admins" | "users"> & {
  userCount: number;
  startDate: number;
};

export interface TransformedGoalSearchResult extends GoalSearchResult {
  joined: boolean;
}
