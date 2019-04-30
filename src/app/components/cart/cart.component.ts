import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cart: IMovie[];
  totalProducts: number = 0;

  constructor(private movieService: MovieService) {
    this.cart = this.movieService.getProductsFromCart();
  }

  ngOnInit() {
    this.calulateTotalProducts();
  }

  calulateTotalProducts(): void {
    for (let i = 0; i < this.cart.length; i++) {
      this.totalProducts += this.cart[i].price;
    }
  }
}
