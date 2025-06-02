import {
  CalculatorResult,
  ICalculator,
} from '../../interface/calculator.interface';

import { PlanProductRateAgent } from './plan.product-rate-agent';

export class PlanCalculator implements ICalculator {
  constructor(
    private planProductRateAgents: Array<PlanProductRateAgent> = [],
  ) {}

  add(plan: PlanProductRateAgent): PlanCalculator {
    this.planProductRateAgents.push(plan);
    return this;
  }

  clear(): PlanCalculator {
    this.planProductRateAgents = [];
    return this;
  }

  calculate(): Record<string, CalculatorResult> {
    const result = {};

    for (const planProductRateAgent of this.planProductRateAgents) {
      const premium = Number(planProductRateAgent.calculate());
      result[planProductRateAgent.code] = {
        code: planProductRateAgent.code,
        premium,
      };
    }

    return result;
  }
}
