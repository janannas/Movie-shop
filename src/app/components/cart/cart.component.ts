import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  cart: IMovie[];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.cart = this.movieService.getProductsFromCart();
    console.log(this.cart);
  }

  totalProducts() {
    /*  return this.products.reduce((sum, product) => {
      return sum + product.quantity
    }, 0); */
  }
}
