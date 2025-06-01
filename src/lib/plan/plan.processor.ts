import { IProcessor } from '../interface/processor.interface';
import { IProduct } from '../interface/product.interface';

import { PlanCalculator } from './calculate/plan.calculator';
import { PlanProductRateAgent } from './calculate/plan.product-rate-agent';

export class PlanProcessor implements IProcessor {
  private planCalculator: PlanCalculator;

  constructor() {
    this.planCalculator = new PlanCalculator();
  }

  process(products: Array<IProduct>): number {
    for (const product of products) {
      this.planCalculator.add(new PlanProductRateAgent(product));
    }

    return this.planCalculator.calculate();
  }
}
