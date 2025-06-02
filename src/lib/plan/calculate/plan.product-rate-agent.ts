import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { PlanInput } from '../../core/plan.input';

import { UWBProductRateAgent } from '../rate-agent/UWB.rate-agent';
import { ProspectInput } from 'src/lib/core/prospect.input';

export class PlanProductRateAgent implements IProductRateAgent {
  private productRateAgent: IProductRateAgent;

  constructor(
    private prospect: ProspectInput,
    private plan: PlanInput,
  ) {
    this.set(this.plan);
  }

  private set(plan: PlanInput) {
    switch (plan.code) {
      case 'UWB':
        this.productRateAgent = new UWBProductRateAgent();
        break;
      default:
        throw new Error(`Plan ${plan.code} not found`);
    }
  }

  get code(): string {
    return this.plan.code;
  }

  calculate(): string {
    return this.productRateAgent.calculate(this.prospect, this.plan);
  }
}
