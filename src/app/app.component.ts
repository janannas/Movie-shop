import { Component } from "@angular/core";
import { MovieService } from "./services/movie.service";
import { Router } from "@angular/router";

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

  constructor(private service: MovieService, private router: Router) {
    this.service.getProductMsg().subscribe(result => {
      let {
        productAdded,
        productAmount,
        productName,
        productRejected
      } = result;

      this.productAdded = productAdded;
      this.productAmount = productAmount;
      this.productName = productName;
      this.productRejected = productRejected;

      setTimeout(() => {
        this.productAdded = false;
      }, 3000);
    });
  }

  handleSearch(searchText: string) {
    if (searchText === undefined || searchText === "") {
      this.emptySearch = true;
    } else if (searchText) {
      this.service.searchMovies(searchText);
      this.router.navigateByUrl("/catalog");
    }
  }

  resetEmptySearch() {
    this.emptySearch = false;
  }
}
