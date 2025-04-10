export enum RequirementsName {
  'Consistency' = 'Consistency',
  'DeepFocus' = 'Deep Focus',
  'Commitment' = 'Commitment',
}

export interface IRequirementLevel {
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
    _id: string;
    consistency: IRequirementLevel;
    deepFocus: IRequirementLevel;
    commitment: IRequirementLevel;
  };
}
