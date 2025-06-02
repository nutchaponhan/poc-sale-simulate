import { Prospect } from '../prospect/prospect';
import { IProduct } from './product.interface';

export interface IProcessor {
  process(prospect: Prospect, products: Array<IProduct>): number;
}
