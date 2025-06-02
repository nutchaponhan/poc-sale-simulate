import { ICalculator } from '../../interface/calculator.interface';

import { RiderProductRateAgent } from './rider.product-rate-agent';

export class RiderCalculator implements ICalculator {
  constructor(
    private riderProductRateAgents: Array<RiderProductRateAgent> = [],
  ) {}

  add(rider: RiderProductRateAgent): RiderCalculator {
    this.riderProductRateAgents.push(rider);
    return this;
  }

  calculate(): number {
    let totalPremium = 0;

    for (const riderProductRateAgent of this.riderProductRateAgents) {
      totalPremium += Number(riderProductRateAgent.calculate());
    }

    console.log({ totalPremium });

    return totalPremium;
  }
}
