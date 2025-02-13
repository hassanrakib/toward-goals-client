export interface IGoal {
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
