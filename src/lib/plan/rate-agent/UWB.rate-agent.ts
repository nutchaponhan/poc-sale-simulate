import { PlanProduct } from '../../core/plan.product';
import { IProductRateAgent } from '../../interface/product-rate-agent.interface';

export class UWBProductRateAgent implements IProductRateAgent {
  constructor(private plan: PlanProduct) {}

  calculate(_input: {
    insuredAge: number;
    mode: number;
    occupationType: string;
    riderSum: number;
  }): string {
    return '1000';
  }
}
