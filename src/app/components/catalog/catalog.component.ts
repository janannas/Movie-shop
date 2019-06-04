import { Component } from "@angular/core";

import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "../../interfaces/IMovie";
import { ICategory } from "src/app/interfaces/ICategory";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"]
})
export class CatalogComponent {
  movies: IMovie[] = [];
  error: boolean;
  categories: ICategory[];
  noSearchResult: boolean = false;
  searchResults: IMovie[];
  toggleDropdown: boolean = false;

  constructor(private service: MovieService) {
    this.service.getSearchResults().subscribe(
      myResults => {
        this.checkIfSearchResults(myResults);
      },
      error => {
        this.error = true;
        console.log("Error: " + error);
      }
    );

    this.service.getMovieData().subscribe(
      myMovieData => {
        this.movies = myMovieData;

        this.service.getCategoryData().subscribe(
          myCategoryData => {
            this.categories = myCategoryData;
            this.connectCategoriesToMovie(myCategoryData);
          },
          error => {
            this.error = true;
            console.log("Error: " + error);
          }
        );
      },
      error => {
        this.error = true;
        console.log("Error: " + error);
      }
    );
  }

  checkIfSearchResults(searchResults: IMovie[]) {
    if (searchResults.length > 0) {
      this.noSearchResult = false;
      this.searchResults = searchResults;
    } else if (searchResults.length === 0) {
      this.noSearchResult = true;
    }
  }

  connectCategoriesToMovie(myCategoryData: ICategory[]) {
    for (const movie of this.movies) {
      for (const movieCategory of movie.productCategory) {
        for (const category of myCategoryData) {
          if (movieCategory.categoryId === category.id) {
            movieCategory.category = category.name;
          }
        }
      }
    }
  }
}
