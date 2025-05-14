export enum RequirementsName {
  "Consistency" = "Consistency",
  "DeepFocus" = "Deep Focus",
  "Commitment" = "Commitment",
}

export interface IRequirementLevel {
  _id: string;
  name: RequirementsName;
  level: number;
  rewardPointsPerDay: number;
  minPercentage: number;
  maxPercentage: number;
}

export interface ILevel {
  level: number;
  badgeImage: string;
  levelUpPoint: number;
  requirements: {
    consistency: IRequirementLevel;
    deepFocus: IRequirementLevel;
    commitment: IRequirementLevel;
  };
}
