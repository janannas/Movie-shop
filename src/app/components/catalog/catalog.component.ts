import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent implements OnInit {
  moviePosters: string[];
  errorMsg: string;

  constructor(private dataService: MovieService) {
    this.dataService.getMovieData().subscribe(
      myData => {
        this.moviePosters = myData.map(obj => obj.imageUrl);
      },
      error => {
        this.errorMsg = error;
      }
    );
  }

  ngOnInit() {}
}
