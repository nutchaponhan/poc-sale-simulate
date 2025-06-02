import { PlanProduct } from '../core/plan.product';
import { RiderProduct } from '../core/rider.product';
import { Prospect } from '../prospect/prospect';

export interface IProductRateAgent {
  calculate: (
    prospect: Prospect,
    product: RiderProduct | PlanProduct,
  ) => string;
}
