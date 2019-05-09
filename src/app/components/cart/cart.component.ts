import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { IBillingForm } from "src/app/interfaces/IBillingForm";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";
import { IFakeForm } from "src/app/interfaces/IFakeForm";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cart: IMovie[];
  totalProducts: number = 0;
  plural: boolean = false;

  constructor(private movieService: MovieService) {
    this.cart = this.movieService.getProductsFromCart();
  }

  ngOnInit() {
    this.calulateTotalProducts();
    this.checkPlural();
  }

  getBillingObject(form: IFakeForm): IBillingForm {
    return {
      companyId: 9,
      created: moment()
        .locale("sv")
        .format("YYYY-MM-DDTLTS"),
      createdBy: form.email,
      paymentMethod: form.paymentMethod,
      totalPrice: this.totalProducts,
      status: 0,
      orderRows: []
    };
  }

  handleForm(fakeForm: IFakeForm) {
    console.log(fakeForm);
    const finalForm = this.getBillingObject(fakeForm);
    console.log(finalForm);

    /* this.movieService
.sendOrder(this.getBillingObject())
.subscribe(
  response => console.log("success", response),
  error => (this.errorMsg = error)
); */
  }

  checkPlural() {
    if (this.cart.length > 1) {
      this.plural = true;
    }
  }

  calulateTotalProducts(): void {
    for (let i = 0; i < this.cart.length; i++) {
      this.totalProducts += this.cart[i].price;
    }
  }
}
