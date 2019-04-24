import { Component, OnInit, Input } from "@angular/core";
import { IMovie } from "src/app/interfaces/IMovie";

@Component({
  selector: "app-movie-poster",
  templateUrl: "./movie-poster.component.html",
  styleUrls: ["./movie-poster.component.css"]
})
export class MoviePosterComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() moviePoster: string;
  @Input() movieId: number;
  cart: IMovie[] = [];
  constructor() {}

  ngOnInit() {}

  addToCart(product: IMovie): void {
    this.cart.push(product);
    console.log(this.cart);
  }
}
