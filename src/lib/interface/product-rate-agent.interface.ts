import { PlanInput } from '../core/plan.input';
import { RiderInput } from '../core/rider.input';
import { ProspectInput } from '../core/prospect.input';

export interface IProductRateAgent {
  calculate: (
    prospect: ProspectInput,
    productInput: RiderInput | PlanInput,
  ) => string;
}
