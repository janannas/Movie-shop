import { Component, OnInit, Input } from "@angular/core";
import { IMovie } from "src/app/interfaces/IMovie";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() moviePoster: string;
  @Input() movieId: number;

  constructor(public MovieService: MovieService) {}

  ngOnInit() {}

  handleClick(product: IMovie): void {
    this.MovieService.addProductToCart(product);
  }
}
