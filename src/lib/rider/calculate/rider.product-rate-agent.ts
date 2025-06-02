import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { RiderInput } from '../../core/rider.input';

import { AC01ProductRateAgent } from '../rate-agent/AC01.rate-agent';
import { ProspectInput } from 'src/lib/core/prospect.input';

export class RiderProductRateAgent {
  private productRateAgent: IProductRateAgent;

  constructor(
    private prospect: ProspectInput,
    private rider: RiderInput,
  ) {
    this.set(this.rider);
  }

  private set(rider: RiderInput) {
    switch (rider.code) {
      case 'AC01':
        this.productRateAgent = new AC01ProductRateAgent();
        break;
      default:
        throw new Error(`Rider ${rider.code} not found`);
    }
  }

  get code(): string {
    return this.rider.code;
  }

  calculate(): string {
    return this.productRateAgent.calculate(this.prospect, this.rider);
  }
}
