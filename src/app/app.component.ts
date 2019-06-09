import { Component } from "@angular/core";
import { MovieService } from "./services/movie.service";
import { Router } from "@angular/router";
import { CartService } from "./services/cart.service";
import { IProductMsg } from "./interfaces/IProductMsg";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  emptySearch: boolean = false;
  productAdded: boolean = false;
  timerId: NodeJS.Timer;
  isRunning: boolean = false;
  productAmount: number;
  productName: string;
  productImage: string;
  productRejected: boolean;
  showSearch: boolean = false;
  showCartIndicator: boolean;

  constructor(
    private movieService: MovieService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService
      .getProductMsg()
      .subscribe(msg => this.handleProductMsg(msg));

    this.cartService
      .getshowCartIndicator()
      .subscribe(bool => (this.showCartIndicator = bool));
  }

  handleProductMsg(myMsg: IProductMsg) {
    let { productAmount, productName, productImage, productRejected } = myMsg;

    this.productAmount = productAmount;
    this.productName = productName;
    this.productImage = productImage;
    this.productRejected = productRejected;

    this.startTimer();
  }

  startTimer(): void {
    this.productAdded = true;

    const closeProductMsg = () => {
      this.isRunning = false;
      this.productAdded = false;
    };

    if (!this.isRunning) {
      this.isRunning = true;
      this.timerId = setTimeout(closeProductMsg.bind(this), 3000);
    } else if (this.isRunning) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(closeProductMsg.bind(this), 3000);
    }
  }

  handleSearch(searchText: string): void {
    if (searchText === undefined || searchText === "") {
      this.emptySearch = true;
    } else if (searchText) {
      this.showSearch = false;
      this.movieService.searchMovies(searchText);
      this.router.navigateByUrl("/catalog");
    }
  }

  resetEmptySearch(): void {
    this.emptySearch = false;
  }
}
