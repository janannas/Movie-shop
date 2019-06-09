import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MovieService } from "../../services/movie.service";
import { IMovie } from "../../interfaces/IMovie";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent {
  movies: IMovie[];
  error: boolean;
  movie: IMovie = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    year: 0,
    added: "",
    productCategory: []
  };

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public cartService: CartService
  ) {
    this.movieService
      .getMovieData()
      .pipe(
        switchMap(myMovieData => {
          this.movies = myMovieData;
          return this.route.paramMap;
        })
      )
      .subscribe(
        params => {
          const id = +params.get("id");
          this.searchMovies(id);
        },
        error => {
          this.error = true;
          console.log("Error: " + error);
        }
      );
  }

  searchMovies(myId: number): void {
    for (let i = 0; i < this.movies.length; i++) {
      if (myId === this.movies[i].id) {
        this.movie = this.movies[i];
      }
    }
  }

  handleClick(product: IMovie): void {
    this.cartService.addProductToCart(product);
  }
}
