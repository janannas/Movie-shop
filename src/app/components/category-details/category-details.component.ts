import { Component, OnInit } from "@angular/core";
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

  constructor(private route: ActivatedRoute, private service: MovieService) {
    this.service.getMovieData().subscribe(myMovieData => {
      this.route.paramMap.subscribe(myParams => {
        const id = +myParams.get("id");
        this.searchCategories(id, myMovieData);
      });
    });
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
