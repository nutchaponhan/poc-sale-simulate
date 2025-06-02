import { IProductRateAgent } from './product-rate-agent.interface';

export type CalculatorResult = {
  code: string;
  premium: number;
};

export interface ICalculator {
  add(products: IProductRateAgent): ICalculator;
  clear(): ICalculator;
  calculate(): Record<string, CalculatorResult>;
}
