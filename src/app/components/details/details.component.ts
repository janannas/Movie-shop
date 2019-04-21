import { Component, OnInit, Input } from "@angular/core";
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
  errorMsg: string;

  constructor(private route: ActivatedRoute, private service: MovieService) {
    this.service.getMovieData().subscribe(
      myData => {
        this.movies = myData;

        console.log(this.movie, this.movies);

        this.route.paramMap.subscribe(myParams => {
          let id = myParams.get("id");
          console.log(id);
          this.searchMovies(+id);
        });
      },
      error => {
        this.errorMsg = error;
      }
    );
  }
  searchMovies(myId: number): IMovie {
    console.log(myId, this.movies);
    for (let i = 0; i < this.movies.length; i++) {
      const elem = this.movies[i];
      if (myId == elem.id) {
        console.log(elem);
        this.movie = elem;
        return elem;
      }
    }
  }

  ngOnInit() {}
}
