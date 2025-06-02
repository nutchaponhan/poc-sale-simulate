import { PlanProduct } from '../core/plan.product';
import { IProcessor } from '../interface/processor.interface';
import { Prospect } from '../prospect/prospect';

import { PlanCalculator } from './calculate/plan.calculator';
import { PlanProductRateAgent } from './calculate/plan.product-rate-agent';

export class PlanProcessor implements IProcessor {
  private planCalculator: PlanCalculator;

  constructor() {
    this.planCalculator = new PlanCalculator();
  }

  process(prospect: Prospect, products: Array<PlanProduct>): number {
    for (const product of products) {
      this.planCalculator.add(new PlanProductRateAgent(prospect, product));
    }

    return this.planCalculator.calculate();
  }
}
