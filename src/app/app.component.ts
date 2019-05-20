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
  constructor(private service: MovieService, private router: Router) { }

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
