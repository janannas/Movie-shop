import { Injectable } from "@angular/core";
import { IMovie } from "../interfaces/IMovie";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cart: IMovie[] = [];
  constructor() {}

  addToCart(myProduct: IMovie): void {
    this.cart.push(myProduct);
  }

  getCart() {
    return this.cart;
  }
}
