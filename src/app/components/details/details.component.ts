import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { IMovie } from "../../interfaces/IMovie";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  movies: IMovie[];
  movie: IMovie;

  constructor(private route: ActivatedRoute, private service: MovieService) {
    this.service.getMovieData().subscribe(myData => {
      this.movies = myData;
      this.route.paramMap.subscribe(myParams => {
        let id = myParams.get("id");
        this.searchMovies(+id);
      });
    });
  }

  searchMovies(myId: number): void {
    for (let i = 0; i < this.movies.length; i++) {
      const elem = this.movies[i];
      if (myId == elem.id) {
        this.movie = elem;
      }
    }
  }

  ngOnInit() {}
}
