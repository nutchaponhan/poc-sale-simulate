import { RiderInput } from '../../interface/rider.input';
import { RateAgent } from '../../core/rate-agent';

export class AC01RateAgent implements RateAgent {
  constructor(private rider: RiderInput) {}

  calculate(): number {
    return 10;
  }
}
