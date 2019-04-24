import { Component, OnInit, Input } from "@angular/core";
import { IMovie } from "src/app/interfaces/IMovie";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() moviePoster: string;
  @Input() movieId: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  handleClick(product: IMovie): void {
    this.cartService.addToCart(product);
  }
}
