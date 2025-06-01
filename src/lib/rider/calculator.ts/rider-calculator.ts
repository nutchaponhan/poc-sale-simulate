import { Calculator } from '../../core/calculator';

import { RiderRateAgent } from './rider-rate-agent';

export class RiderCalculator implements Calculator {
  constructor(private riderRateAgents: Array<RiderRateAgent> = []) {}

  add(rider: RiderRateAgent): RiderCalculator {
    this.riderRateAgents.push(rider);
    return this;
  }

  calculate(): number {
    let totalPremium = 0;

    for (const riderRateAgent of this.riderRateAgents) {
      totalPremium += riderRateAgent.calculate();
    }

    return totalPremium;
  }
}
