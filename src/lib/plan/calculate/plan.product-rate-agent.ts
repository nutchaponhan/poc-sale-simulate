import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { PlanProduct } from '../../core/plan.product';

import { UWBProductRateAgent } from '../rate-agent/UWB.rate-agent';
import { Prospect } from 'src/lib/prospect/prospect';

export class PlanProductRateAgent implements IProductRateAgent {
  private productRateAgent: IProductRateAgent;

  constructor(
    private prospect: Prospect,
    private plan: PlanProduct,
  ) {
    this.set(this.plan);
  }

  private set(plan: PlanProduct) {
    switch (plan.code) {
      case 'UWB':
        this.productRateAgent = new UWBProductRateAgent();
        break;
      default:
        throw new Error(`Plan ${plan.code} not found`);
    }
  }

  calculate(): string {
    return this.productRateAgent.calculate(this.prospect, this.plan);
  }
}
