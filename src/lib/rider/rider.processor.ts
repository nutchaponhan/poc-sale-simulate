import { RiderProduct } from '../core/rider.product';
import { IProcessor } from '../interface/processor.interface';
import { Prospect } from '../prospect/prospect';

import { RiderCalculator } from './calculate/rider.calculator';
import { RiderProductRateAgent } from './calculate/rider.product-rate-agent';

export class RiderProcessor implements IProcessor {
  private riderCalculator: RiderCalculator;

  constructor() {
    this.riderCalculator = new RiderCalculator();
  }

  process(prospect: Prospect, products: Array<RiderProduct>): number {
    for (const product of products) {
      this.riderCalculator.add(new RiderProductRateAgent(prospect, product));
    }

    return this.riderCalculator.calculate();
  }
}
