import { Product } from './product';

export class Cart {
    id: String
    product:Product
    quantity: Number = 0
    subtotal: number = 0
}