import { Injectable } from "@angular/core";
import { IMovie } from "../interfaces/IMovie";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cart: IMovie[] = [];
  constructor() {}

  addToCart(myProduct: IMovie) {
    this.cart.push(myProduct);
    console.log(this.cart);
  }

  getCart() {
    return this.cart;
  }
}
