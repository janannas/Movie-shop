import { Component, OnInit, Input } from "@angular/core";
import { IMovie } from "src/app/interfaces/IMovie";
import { CartService } from "src/app/services/cart.service";
import { ICategory } from "src/app/interfaces/ICategory";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() movie: IMovie = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    year: 0,
    added: "",
    productCategory: []
  };
  @Input() moviePoster: string;
  @Input() movieId: number;

  constructor(public cartService: CartService) {}

  ngOnInit() {}

  handleClick(product: IMovie): void {
    this.cartService.addProductToCart(product);
  }
}
