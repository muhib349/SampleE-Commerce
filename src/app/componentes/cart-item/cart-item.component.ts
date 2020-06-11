import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {


  total = 0;

  constructor() { }

  @Input() cartItems: Cart[];
  @Output() cartEvent = new EventEmitter<Cart[]>();


  ngOnInit(): void {
  }

  removeCartItem(cart: Cart){
    this.cartItems =  this.cartItems.filter(item => item.product._id !== cart.product._id)

    this.total -= cart.subtotal;
    this.cartEvent.emit(this.cartItems)

  }

  onChangeQuantity(value, cart: Cart){


    if(value > cart.product.quantity){
      alert("Available product is: " + cart.product.quantity)
      return
    }

    var index = this.cartItems.indexOf(cart);
    if(index >= 0){
      cart.subtotal = cart.product.price* value
      this.cartItems[index] = cart
    }
    
  }

  public getTotal(){
    this.total = 0
    this.cartItems.forEach(element => {

      this.total += element.subtotal
    });
  
    return this.total
  }



}
