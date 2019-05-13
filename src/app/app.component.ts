import { Component } from "@angular/core";
import { MovieService } from "./services/movie.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private service: MovieService, private router: Router) {}

  handleSearch(searchText: string) {
    this.service.searchMovies(searchText);
    this.router.navigateByUrl("/catalog");
  }
}
