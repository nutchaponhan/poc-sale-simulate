import { Products } from '../interface/product';

export abstract class Processor {
  abstract process(products: Array<Products>): number;
}
