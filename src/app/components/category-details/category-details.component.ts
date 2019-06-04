import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"]
})
export class CategoryDetailsComponent implements OnInit {
  movies: IMovie[] = [];
  error: boolean;
  id: number;
  toggleDropdown: boolean = false;

  constructor(private route: ActivatedRoute, private service: MovieService) {
    this.service.getMovieData().subscribe(
      myMovieData => {
        this.route.paramMap.subscribe(myParams => {
          this.id = +myParams.get("id");
          this.searchCategories(this.id, myMovieData);
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

  ngOnInit() {}
}
