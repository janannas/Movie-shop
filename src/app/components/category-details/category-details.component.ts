import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"]
})
export class CategoryDetailsComponent {
  movies: IMovie[] = [];
  error: boolean;
  id: number;

  constructor(private route: ActivatedRoute, private service: MovieService) {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.id = +params.get("id");
          return this.service.getMovieData();
        })
      )
      .subscribe(
        myMovieData => {
          this.searchCategories(this.id, myMovieData);
        },
        error => {
          this.error = true;
          console.log("Error: " + error);
        }
      );
  }

  searchCategories(myId: number, myMovieData: IMovie[]) {
    for (const movie of myMovieData) {
      for (const categoryData of movie.productCategory) {
        if (myId === categoryData.categoryId) {
          this.movies.push(movie);
        }
      }
    }
  }
}
