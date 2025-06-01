import { ICalculator } from '../../interface/calculator.interface';

import { PlanProductRateAgent } from './plan.product-rate-agent';

export class PlanCalculator implements ICalculator {
  constructor(
    private planProductRateAgents: Array<PlanProductRateAgent> = [],
  ) {}

  add(plan: PlanProductRateAgent): PlanCalculator {
    this.planProductRateAgents.push(plan);
    return this;
  }

  calculate(): number {
    let totalPremium = 0;

    for (const planProductRateAgent of this.planProductRateAgents) {
      totalPremium += planProductRateAgent.calculate();
    }

    return totalPremium;
  }
}
