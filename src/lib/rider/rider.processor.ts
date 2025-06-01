import { IProcessor } from '../interface/processor.interface';
import { IProduct } from '../interface/product.interface';

import { RiderCalculator } from './calculate/rider.calculator';
import { RiderProductRateAgent } from './calculate/rider.product-rate-agent';

export class RiderProcessor implements IProcessor {
  private riderCalculator: RiderCalculator;

  constructor() {
    this.riderCalculator = new RiderCalculator();
  }

  process(products: Array<IProduct>): number {
    for (const product of products) {
      this.riderCalculator.add(new RiderProductRateAgent(product));
    }

    return this.riderCalculator.calculate();
  }
}
