import { IProduct } from '../interface/product.interface';

export abstract class PlanProduct implements IProduct {
  code: string;
}
