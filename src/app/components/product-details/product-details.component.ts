import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { IMovie } from "../../interfaces/IMovie";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
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
    private cartService: CartService
  ) {
    this.movieService.getMovieData().subscribe(
      myData => {
        this.movies = myData;
        this.route.paramMap.subscribe(myParams => {
          const id = +myParams.get("id");
          this.searchMovies(id);
        });
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

  ngOnInit() {}
}
