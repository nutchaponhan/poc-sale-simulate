class OccGroupDetail {
  multiplier: number;
  value: number;
  with: string[] | null;

  constructor(data: any) {
    this.multiplier = data.multiplier;
    this.value = data.value;
    this.with = data.with ?? null;
  }
}

class AgeOccGroup {
  age: string;
  occGroup: Record<string, OccGroupDetail>;

  constructor(data: any) {
    this.age = data.age;
    this.occGroup = {};
    for (const key in data.occGroup) {
      this.occGroup[key] = new OccGroupDetail(data.occGroup[key]);
    }
  }
}

class Step {
  value: number;
  step: number;

  constructor(data: any) {
    this.value = data.value;
    this.step = data.step;
  }
}

class AgeRange {
  min: string;
  max: string;

  constructor(data: any) {
    this.min = data.min;
    this.max = data.max;
  }
}

class SumRange {
  min: Record<string, AgeOccGroup>;
  max: Record<string, AgeOccGroup>;

  constructor(data: any) {
    this.min = {};
    for (const key in data.min) {
      this.min[key] = new AgeOccGroup(data.min[key]);
    }

    this.max = {};
    for (const key in data.max) {
      this.max[key] = new AgeOccGroup(data.max[key]);
    }
  }
}

export class ACRiderProduct {
  rider: string;
  code: string;
  displayName: string;
  age: AgeRange;
  steps: Step[];
  sum: SumRange;
  requiredPermission: string;

  // data from AC01.rider.json
  constructor(data: any) {
    this.rider = data.rider;
    this.code = data.code;
    this.displayName = data.displayName;
    this.age = new AgeRange(data.age);
    this.steps = data.steps.map((step: any) => new Step(step));
    this.sum = new SumRange(data.sum);
    this.requiredPermission = data.requiredPermission;
  }
}
