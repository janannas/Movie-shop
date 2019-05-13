import { Component, OnInit } from "@angular/core";

import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "../../interfaces/IMovie";
import { ICategory } from "src/app/interfaces/ICategory";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent implements OnInit {
  movies: IMovie[];
  errorMsg: string;
  categories: ICategory[];

  constructor(private service: MovieService) {
    this.service.getMovieData().subscribe(
      myMovieData => {
        this.movies = myMovieData;

        this.service.getCategoryData().subscribe(myCategoryData => {
          this.categories = myCategoryData;

          /*
          Looping through movieCategories inside this.movies to connect
          category-id with correct category-name
          */
          for (const movie of this.movies) {
            for (const movieCategory of movie.productCategory) {
              for (const category of this.categories) {
                if (movieCategory.categoryId === category.id) {
                  movieCategory.category = category.name;
                }
              }
            }
          }
        });
      },
      error => {
        this.errorMsg = error;
      }
    );
  }

  ngOnInit() {}
}
