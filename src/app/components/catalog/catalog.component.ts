import { Component } from "@angular/core";
import { mergeMap } from "rxjs/operators";

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
  showCategories: boolean = false;

  constructor(private service: MovieService) {
    this.service
      .getMovieData()
      .pipe(
        // Presenting all movies unregarding wether user searched for a specific
        // movie or not
        mergeMap(myMovieData => {
          this.movies = myMovieData;
          return this.service.getCategoryData();
        }),
        // Hook the movies up with their repective category
        mergeMap(myCategoryData => {
          this.categories = myCategoryData;
          this.connectCategoryToMovie(myCategoryData);
          return this.service.getSearchResults();
        })
      )
      .subscribe(
        // If user searched for a movie, the result will be presented
        myResults => {
          this.checkIfSearchResults(myResults);
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

  connectCategoryToMovie(myCategoryData: ICategory[]) {
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
