import { Component, OnInit, Input } from '@angular/core';
import { ProductItemService } from './product-item.service'
import { Product } from '../../interfaces/product';
import { User } from '../../interfaces/User'
import { Cart } from 'src/app/interfaces/cart';
import { stringify } from 'querystring';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input('user') ngUser: User;

  products: Product[] = [];

  cartList: Cart[] = [];

  constructor(private service: ProductItemService) { }

  onAddToCart(product: Product) {

    if (!this.cartList.some(c => c.product === product)) {
      var cart = new Cart()
      cart.product = product
      cart.quantity = 1;
      cart.subtotal = product.price
      this.cartList.push(cart);
    }
  }

  ngOnInit() {
    this.service.getProductList().subscribe((response: Product[]) => {
      this.products = response
    });
  }

  receiveEvent(event: Cart[]){
    this.cartList = event
  }
}
