import { RiderCalculator } from '../rider/calculate/rider.calculator';
import { RiderProductRateAgent } from '../rider/calculate/rider.product-rate-agent';

import { PlanCalculator } from '../plan/calculate/plan.calculator';
import { PlanProductRateAgent } from '../plan/calculate/plan.product-rate-agent';
import { ProspectInput } from '../core/prospect.input';
import {
  IProcessor,
  TProcessorState,
  TProcessorInput,
  TProcessorResult,
} from '../interface/processor.interface';
import { CalculatorResult } from '../interface/calculator.interface';

export class PremiumProcessor implements IProcessor {
  private state: TProcessorState = {
    prospect: new ProspectInput(),
    plans: [],
    riders: [],
  };
  private planCalculator: PlanCalculator;
  private riderCalculator: RiderCalculator;

  constructor(prospect: ProspectInput, input?: TProcessorInput) {
    this.state = {
      prospect: prospect,
      plans: input?.plans || [],
      riders: input?.riders || [],
    };
    this.planCalculator = new PlanCalculator();
    this.riderCalculator = new RiderCalculator();
  }

  private clean(): void {
    this.planCalculator.clear();
    this.riderCalculator.clear();
  }

  private formatResult(
    planResult: Record<string, CalculatorResult>,
    riderResult: Record<string, CalculatorResult>,
  ): any {
    const planPremium = Object.values(planResult).reduce(
      (acc, curr) => acc + curr.premium,
      0,
    );
    const riderPremium = Object.values(riderResult).reduce(
      (acc, curr) => acc + curr.premium,
      0,
    );

    return {
      totalPremium: planPremium + riderPremium,
      plans: planResult,
      riders: riderResult,
    };
  }

  process(input?: TProcessorInput): TProcessorResult {
    this.state = {
      prospect: input?.prospect || this.state.prospect,
      plans: input?.plans || this.state.plans,
      riders: input?.riders || this.state.riders,
    };

    for (const product of this.state.plans) {
      this.planCalculator.add(
        new PlanProductRateAgent(this.state.prospect, product),
      );
    }

    for (const product of this.state.riders) {
      this.riderCalculator.add(
        new RiderProductRateAgent(this.state.prospect, product),
      );
    }

    const planResult = this.planCalculator.calculate();
    const riderResult = this.riderCalculator.calculate();

    this.clean();

    const result = this.formatResult(planResult, riderResult);

    return result;
  }
}
