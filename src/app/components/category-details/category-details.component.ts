import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.css"]
})
export class CategoryDetailsComponent implements OnInit {
  movies: IMovie[] = [];
  error: boolean;

  constructor(private route: ActivatedRoute, private service: MovieService) {
    this.service.getMovieData().subscribe(
      myMovieData => {
        this.route.paramMap.subscribe(myParams => {
          const id = +myParams.get("id");
          this.searchCategories(id, myMovieData);
        });
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

  ngOnInit() { }
}
