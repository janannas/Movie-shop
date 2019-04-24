import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  cart: IMovie[];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }
}
