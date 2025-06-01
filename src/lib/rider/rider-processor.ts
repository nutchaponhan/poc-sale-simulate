import { Processor } from '../core/processor';
import { Products } from '../interface/product';

import { RiderCalculator } from './calculator/rider-calculator';
import { RiderRateAgent } from './calculator/rider-rate-agent';

export class RiderProcessor implements Processor {
  private riderCalculator: RiderCalculator;

  constructor() {
    this.riderCalculator = new RiderCalculator();
  }

  process(products: Array<Products>): number {
    for (const product of products) {
      this.riderCalculator.add(new RiderRateAgent(product));
    }

    return this.riderCalculator.calculate();
  }
}
