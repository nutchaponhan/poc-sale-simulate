import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { RiderProduct } from '../../core/rider.product';

import { AC01ProductRateAgent } from '../rate-agent/AC01.rate-agent';

export class RiderProductRateAgent implements IProductRateAgent {
  private productRateAgent: IProductRateAgent;

  constructor(rider: RiderProduct) {
    this.set(rider);
  }

  private set(rider: RiderProduct) {
    switch (rider.code) {
      case 'AC01':
        this.productRateAgent = new AC01ProductRateAgent(rider);
        break;
      default:
        throw new Error(`Rider ${rider.code} not found`);
    }
  }

  calculate(): string {
    // TODO: add input from lead, plan, etc.
    return this.productRateAgent.calculate({
      insuredAge: 25,
      mode: 2,
      occupationType: '2',
      riderSum: 50000,
    });
  }
}
