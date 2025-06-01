import { Calculator } from '../../core/calculator';

import { PlanRateAgent } from './plan-rate-agent';

export class PlanCalculator implements Calculator {
  constructor(private planRateAgents: Array<PlanRateAgent> = []) {}

  add(plan: PlanRateAgent): PlanCalculator {
    this.planRateAgents.push(plan);
    return this;
  }

  calculate(): number {
    let totalPremium = 0;

    for (const planRateAgent of this.planRateAgents) {
      totalPremium += planRateAgent.calculate();
    }

    return totalPremium;
  }
}
