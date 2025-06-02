import { Prospect } from 'src/lib/prospect/prospect';
import { PlanProduct } from '../../core/plan.product';
import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { readPlanRateFile } from '../../utility/file';

export class UWBProductRateAgent implements IProductRateAgent {
  private config: any;

  constructor() {
    this.load('UWB.premium.json');
  }

  load(asset: string) {
    const data = readPlanRateFile(asset);
    this.config = data.premiumRate;
    return this;
  }

  calculate(_prospect: Prospect, plan: PlanProduct): string {
    return String(plan.rpp);
  }
}
