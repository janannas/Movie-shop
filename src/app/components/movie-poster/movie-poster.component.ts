import { Component, OnInit, Input } from "@angular/core";
import { IMovie } from "src/app/interfaces/IMovie";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-movie-poster",
  templateUrl: "./movie-poster.component.html",
  styleUrls: ["./movie-poster.component.css"]
})
export class MoviePosterComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() moviePoster: string;
  @Input() movieId: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  handleClick(product: IMovie): void {
    this.cartService.addToCart(product);
  }
}
