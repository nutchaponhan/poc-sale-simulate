import { PlanInput } from '../core/plan.input';
import { ProspectInput } from '../core/prospect.input';
import { RiderInput } from '../core/rider.input';
import { CalculatorResult } from './calculator.interface';

export type TProcessorState = {
  prospect: ProspectInput;
  plans: Array<PlanInput>;
  riders: Array<RiderInput>;
};

export type TProcessorInput = {
  prospect?: ProspectInput;
  plans?: Array<PlanInput>;
  riders?: Array<RiderInput>;
};

export type TProcessorResult = {
  plan: Record<string, CalculatorResult>;
  rider: Record<string, CalculatorResult>;
};

export interface IProcessor {
  process(input?: TProcessorInput): TProcessorResult;
}
