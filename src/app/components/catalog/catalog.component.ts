import { Component, OnInit } from "@angular/core";
import { MockMovieService } from "../../services/mock-movie.service";
@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent implements OnInit {
  moviePosters: string[] = [];

  constructor(dataService: MockMovieService) {
    this.moviePosters = dataService.getMoviePosterData();
  }

  ngOnInit() {}
}
