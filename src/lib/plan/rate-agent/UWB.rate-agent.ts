import { Prospect } from 'src/lib/prospect/prospect';
import { PlanInput } from '../../core/plan.input';
import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { readPlanRateFile } from '../../utility/file';
import { ProspectInput } from 'src/lib/core/prospect.input';

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

  calculate(pi: ProspectInput, planI: PlanInput): string {
    const _prospect = new Prospect(pi);
    return String(planI.rpp);
  }
}
