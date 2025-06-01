import { Calculator } from 'src/interfaces/calculator';

export interface Products {
  code: string;
}

export class PremiumService {
  constructor(private calculator: Calculator) {}

  calculatePremium(products: Array<Products>): number {
    for (const product of products) {
      this.calculator.add(product);
    }

    const result = this.calculator.calculate();

    return result;
  }
}
