import { Component } from "@angular/core";

import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "../../interfaces/IMovie";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent {
  movies: IMovie[];
  errorMsg: string;
  noSearchResults: boolean = false;
  searchResults: IMovie[];

  constructor(private service: MovieService) {
    this.service.getSearchResults().subscribe(
      results => {
        if (results.length > 0) {
          this.noSearchResults = false;
          this.searchResults = results;
        } else if (results.length === 0) {
          this.noSearchResults = true;
        }
      },
      error => {
        this.errorMsg = error;
      }
    );

    this.service.getMovieData().subscribe(
      myMovieData => {
        this.movies = myMovieData;

        this.service.getCategoryData().subscribe(myCategoryData => {
          /*
          Looping through movieCategories inside this.movies to connect
          category-id with correct category-name
          */
          for (const movie of this.movies) {
            for (const movieCategory of movie.productCategory) {
              for (const category of myCategoryData) {
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
}
