import { RateAgent } from './rate-agent';
import { RiderInput } from '../rider-calculator';

export class AC01RateAgent implements RateAgent {
  constructor(private rider: RiderInput) {}

  calculate(): number {
    return 10;
  }
}
