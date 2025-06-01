import { IProductRateAgent } from '../../interface/product-rate-agent.interface';
import { RiderProduct } from '../../core/rider.product';

export class AC01ProductRateAgent implements IProductRateAgent {
  constructor(private rider: RiderProduct) {}

  calculate(): number {
    return 10;
  }
}
