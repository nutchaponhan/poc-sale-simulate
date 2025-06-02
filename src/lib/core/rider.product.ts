import { IProduct } from '../interface/product.interface';

export abstract class RiderProduct implements IProduct {
  code: string;
  premium: string;
}
