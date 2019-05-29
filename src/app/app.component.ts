import { Component } from "@angular/core";
import { MovieService } from "./services/movie.service";
import { Router } from "@angular/router";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  emptySearch: boolean = false;
  productAdded: boolean = false;
  productAmount: number;
  productName: string;
  productImage: string;
  productRejected: boolean;
  isRunning: boolean = false;
  //toggles dropdown and overlay scss-classes
  isShowing: boolean = false;

  constructor(
    private movieService: MovieService,
    private cartService: CartService,
    private router: Router
  ) {
    let timerId;

    this.cartService.getProductMsg().subscribe(result => {
      let {
        productAmount,
        productName,
        productImage,
        productRejected
      } = result;

      this.productAmount = productAmount;
      this.productName = productName;
      this.productImage = productImage;
      this.productRejected = productRejected;
      console.log(this.productAmount);

      this.productAdded = true;

      if (!this.isRunning) {
        this.isRunning = true;
        timerId = setTimeout(this.closeProductMsg.bind(this), 3000);
      } else if (this.isRunning) {
        clearTimeout(timerId);
        //console.log(timerId);
        timerId = setTimeout(this.closeProductMsg.bind(this), 3000);
      }
    });
  }

  closeProductMsg() {
    this.isRunning = false;
    this.productAdded = false;
  }

  handleSearch(searchText: string) {
    if (searchText === undefined || searchText === "") {
      this.emptySearch = true;
    } else if (searchText) {
      this.isShowing = false;
      this.movieService.searchMovies(searchText);
      this.router.navigateByUrl("/catalog");
    }
  }

  resetEmptySearch() {
    this.emptySearch = false;
  }

  toggleDropdown() {
    this.isShowing = !this.isShowing;
  }
}
