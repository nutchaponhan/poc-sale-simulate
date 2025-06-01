import { Calculator } from 'src/interfaces/calculator';

import { RiderRateAgent } from './rider-rate-agent';

export interface RiderInput {
  code: string;
}

export class RiderCalculator implements Calculator {
  private riderRateAgents: Array<RiderRateAgent> = [];

  add(rider: RiderInput): RiderCalculator {
    this.riderRateAgents.push(new RiderRateAgent(rider));
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
