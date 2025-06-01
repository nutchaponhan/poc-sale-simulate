import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { PlanProduct } from '../../core/plan.product';

import { UWBProductRateAgent } from '../rate-agent/UWB.rate-agent';

export class PlanProductRateAgent implements IProductRateAgent {
  private productRateAgent: IProductRateAgent;

  constructor(plan: PlanProduct) {
    this.set(plan);
  }

  private set(plan: PlanProduct) {
    switch (plan.code) {
      case 'UWB':
        this.productRateAgent = new UWBProductRateAgent(plan);
        break;
      default:
        throw new Error(`Plan ${plan.code} not found`);
    }
  }

  calculate(): number {
    return this.productRateAgent.calculate();
  }
}
