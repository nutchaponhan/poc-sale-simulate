import { PlanInput } from '../../interface/plan.input';
import { RateAgent } from '../../core/rate-agent';

export class UWBRateAgent implements RateAgent {
  constructor(private plan: PlanInput) {}

  calculate(): number {
    return 1000;
  }
}
