import { Processor } from '../core/processor';
import { Products } from '../interface/product';

import { PlanCalculator } from './calculator/plan-calculator';
import { PlanRateAgent } from './calculator/plan-rate-agent';

export class PlanProcessor implements Processor {
  private planCalculator: PlanCalculator;

  constructor() {
    this.planCalculator = new PlanCalculator();
  }

  process(products: Array<Products>): number {
    for (const product of products) {
      this.planCalculator.add(new PlanRateAgent(product));
    }

    return this.planCalculator.calculate();
  }
}
