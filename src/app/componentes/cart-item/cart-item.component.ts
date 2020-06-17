import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Cart } from 'src/app/interfaces/cart';
import { CartItemService } from './cart-item.service';
import { User } from 'src/app/interfaces/user';
import { ProductItemService } from '../products/product-item.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {


  total = 0;
  disableOrder = false;

  constructor(private serviec: CartItemService) { }

  @Input() cartItems: Cart[];
  @Input('user') ngUser: User;

  @Output() cartEvent = new EventEmitter<Cart[]>();
  @Output() orderSavedEvent = new EventEmitter<String>();

  ngOnInit(): void {
  }

  removeCartItem(cart: Cart){
    this.cartItems =  this.cartItems.filter(item => item.product._id !== cart.product._id)

    this.total -= cart.subtotal;
    this.cartEvent.emit(this.cartItems)

  }

  onChangeQuantity(value, cart: Cart){

  

    var index = this.cartItems.indexOf(cart);
    if(index >= 0){
      cart.quantity = value;
      cart.subtotal = cart.product.price* value
      this.cartItems[index] = cart
    }

    this.disableOrder = false;

    this.cartItems.forEach(element => {
      if(element.quantity > element.product.quantity){
        this.disableOrder = true;
      }
    });
    
  }

  public getTotal(){
    this.total = 0
    this.cartItems.forEach(element => {

      this.total += element.subtotal
    });
  
    return this.total
  }

  public onCheckout(){
    this.serviec.addOrder(this.cartItems,this.ngUser).add((err, data) =>{
      if(err){
        console.log("error")
      }else{
        this.cartItems = [];
        this.cartEvent.emit(this.cartItems);
        this.orderSavedEvent.emit("Order Successfully Added!")
      }
    });
  }



}
