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

  calculate(prospect: Prospect, _plan: PlanProduct): string {
    const input = {
      insuredAge: prospect.age,
      mode: '1',
      occupationType: prospect.occupationType,
      riderSum: 10000,
    };

    return String(input.riderSum);
  }
}
