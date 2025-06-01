import { RateAgent } from '../../core/rate-agent';
import { PlanInput } from '../../interface/plan.input';

import { UWBRateAgent } from '../rate-agent/UWB.rate-agent';

export class PlanRateAgent implements RateAgent {
  private rateAgent: RateAgent;

  constructor(plan: PlanInput) {
    this.setRider(plan);
  }

  private setRider(plan: PlanInput) {
    switch (plan.code) {
      case 'UWB':
        this.rateAgent = new UWBRateAgent(plan);
        break;
      default:
        throw new Error(`Plan ${plan.code} not found`);
    }
  }

  calculate(): number {
    return this.rateAgent.calculate();
  }
}
