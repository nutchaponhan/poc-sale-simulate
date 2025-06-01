import { RateAgent } from './rate-agent/rate-agent';
import { AC01RateAgent } from './rate-agent/AC01.rate-agent';
import { RiderInput } from './rider-calculator';

export class RiderRateAgent {
  private rateAgent: RateAgent;

  constructor(rider: RiderInput) {
    this.setRider(rider);
  }

  private setRider(rider: RiderInput) {
    switch (rider.code) {
      case 'AC01':
        this.rateAgent = new AC01RateAgent(rider);
        break;
      default:
        throw new Error(`Rider ${rider.code} not found`);
    }
  }

  calculate(): number {
    return this.rateAgent.calculate();
  }
}
