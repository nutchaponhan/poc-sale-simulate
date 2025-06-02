import {
  CalculatorResult,
  ICalculator,
} from '../../interface/calculator.interface';

import { RiderProductRateAgent } from './rider.product-rate-agent';

export class RiderCalculator implements ICalculator {
  constructor(
    private riderProductRateAgents: Array<RiderProductRateAgent> = [],
  ) {}

  add(rider: RiderProductRateAgent): RiderCalculator {
    this.riderProductRateAgents.push(rider);
    return this;
  }

  clear(): RiderCalculator {
    this.riderProductRateAgents = [];
    return this;
  }

  calculate(): Record<string, CalculatorResult> {
    const result = {};

    for (const riderProductRateAgent of this.riderProductRateAgents) {
      const premium = Number(riderProductRateAgent.calculate());
      result[riderProductRateAgent.code] = {
        code: riderProductRateAgent.code,
        premium,
      };
    }

    return result;
  }
}
