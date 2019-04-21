import { Component, OnInit } from "@angular/core";

import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "../../interfaces/IMovie";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent implements OnInit {
  movies: IMovie[];
  errorMsg: string;

  constructor(private service: MovieService) {
    this.service.getMovieData().subscribe(
      myData => {
        this.movies = myData;
        //this.moviePosters = myData.map(obj => obj.imageUrl);
      },
      error => {
        this.errorMsg = error;
      }
    );
  }

  ngOnInit() {}
}
