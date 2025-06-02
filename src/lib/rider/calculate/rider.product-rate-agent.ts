import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { RiderProduct } from '../../core/rider.product';

import { AC01ProductRateAgent } from '../rate-agent/AC01.rate-agent';
import { Prospect } from 'src/lib/prospect/prospect';

export class RiderProductRateAgent {
  private productRateAgent: IProductRateAgent;

  constructor(
    private prospect: Prospect,
    private rider: RiderProduct,
  ) {
    this.set(this.rider);
  }

  private set(rider: RiderProduct) {
    switch (rider.code) {
      case 'AC01':
        this.productRateAgent = new AC01ProductRateAgent();
        break;
      default:
        throw new Error(`Rider ${rider.code} not found`);
    }
  }

  calculate(): string {
    return this.productRateAgent.calculate(this.prospect, this.rider);
  }
}
