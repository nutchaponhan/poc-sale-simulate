import { IProduct } from './product.interface';

export interface IProcessor {
  process(products: Array<IProduct>): number;
}
