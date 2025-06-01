export interface Plan {
  type: string;
  name: string;
  minAge: number;
  maxAge: number;
  gender: string;
  minPremium: number;
  maxPremium: number;
  minCoverage: number;
  maxCoverage: number;
  riders?: Array<string>;
}
