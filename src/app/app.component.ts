import { Component } from "@angular/core";
import { MovieService } from "./services/movie.service";
import { Router } from "@angular/router";
import { CartService } from "./services/cart-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  emptySearch: boolean = false;
  productAdded: boolean = false;
  productAmount: number;
  productName: string;
  productRejected: boolean;

  constructor(
    private movieService: MovieService,
    private cartService: CartService,
    private router: Router
  ) {
    let isRunning = false;

    this.cartService.getProductMsg().subscribe(result => {
      let { productAmount, productName, productRejected } = result;

      this.productAdded = true;
      this.productAmount = productAmount;
      this.productName = productName;
      this.productRejected = productRejected;

      if (!isRunning) {
        isRunning = true;

        setTimeout(() => {
          isRunning = false;
          this.productAdded = false;
        }, 3000);
      }
    });
  }

  handleSearch(searchText: string) {
    if (searchText === undefined || searchText === "") {
      this.emptySearch = true;
    } else if (searchText) {
      this.movieService.searchMovies(searchText);
      this.router.navigateByUrl("/catalog");
    }
  }

  resetEmptySearch() {
    this.emptySearch = false;
  }
}
