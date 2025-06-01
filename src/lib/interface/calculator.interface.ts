import { IProductRateAgent } from './product-rate-agent.interface';

export interface ICalculator {
  add(products: IProductRateAgent): ICalculator;
  calculate(): number;
}
