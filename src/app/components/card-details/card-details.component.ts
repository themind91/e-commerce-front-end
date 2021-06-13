import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCardDetails();
  }
  listCardDetails() {

    // get a handle to the cart items

    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice

    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice = data
    )

    // subscribe to the cart totalQuantity

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    // compute total price and quantity

    this.cartService.computeCartTotals();

  }

  incrementQuantity(cartItem:CartItem){

    this.cartService.addToCart(cartItem);
    
  }

  decrementQuantity(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem,false);


  }

  remove(carItem: CartItem){
    this.cartService.removeFromCart(carItem,true);
  }

}
