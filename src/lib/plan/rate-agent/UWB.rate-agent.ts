import { PlanProduct } from '../../core/plan.product';
import { IProductRateAgent } from '../../interface/product-rate-agent.interface';

export class UWBProductRateAgent implements IProductRateAgent {
  constructor(private plan: PlanProduct) {}

  calculate(): number {
    return 1000;
  }
}
