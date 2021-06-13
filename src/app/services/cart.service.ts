import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {CartItem} from "../common/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  removeFromCart(cartItem: CartItem, all:boolean) {
    
    cartItem.quantity--;

    const filteredCarts = this.cartItems.findIndex(temp => temp.id == cartItem.id);

    if( filteredCarts > -1 && cartItem.quantity === 0)
      this.cartItems.splice(filteredCarts,1);

    if(all)
      this.cartItems.splice(filteredCarts,1);
    this.computeCartTotals();
  }

  addToCart(cartItem: CartItem){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem = undefined;

    if(this.cartItems.length > 0){

      existingCartItem = this.cartItems.find(temp => temp.id === cartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart){
      
      existingCartItem!.quantity++;
    }else{
      this.cartItems.push(cartItem);
    }

    console.log(this.cartItems.length);

    this.computeCartTotals();
  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue+= currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue+= currentCartItem.quantity;
    }

    // public the new values for all subscribers

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log(" Contents of the cart ");

    for(let temp of this.cartItems){
      const subTotalPrice = temp.quantity * temp.unitPrice;
      console.log(`name: ${temp.name}, quantity=${temp.quantity} unitPrice=${temp.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}`);
    console.log(`totalQuantity: ${totalQuantityValue}`);

    console.log(" ------- ");

  }
}
