import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";
import { IFakeForm } from "src/app/interfaces/IFakeForm";
import { IOrderRows } from "src/app/interfaces/IOrderRows";
import { IBillingForm } from "src/app/interfaces/IBillingForm";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cart: IMovie[];
  totalProducts: number = 0;
  plural: boolean = false;
  orderRows: IOrderRows[] = [];
  emptyCart: boolean;

  constructor(private movieService: MovieService) {
    this.cart = this.movieService.getProductsFromCart();
    this.emptyCart = this.movieService.checkCartEmpty();
    this.orderRows = this.movieService.createOrderRows();
  }

  ngOnInit() {
    this.checkPlural();
    this.calculateTotalProducts();
  }

  handleUpdateAmount(amount: number, id: number) {
    this.movieService.updateAmount(amount, id);
    this.calculateTotalProducts();
  }

  createBillingObject(form: IFakeForm): IBillingForm {
    return {
      companyId: 9,
      created: moment()
        .locale("sv")
        .format("YYYY-MM-DDTLTS"),
      createdBy: form.email,
      paymentMethod: form.paymentMethod,
      totalPrice: this.totalProducts,
      status: 0,
      orderRows: this.orderRows
    };
  }

  handleForm(fakeForm: IFakeForm) {
    const finalForm = this.createBillingObject(fakeForm);
    console.log(finalForm);

    /* this.movieService
      .sendOrder(finalForm)
      .subscribe(
        response => console.log("success", response),
        error => console.log("error", error)
      ); */
  }

  checkPlural() {
    if (this.cart.length > 1) {
      this.plural = true;
    } else {
      this.plural = false;
    }
  }

  handleRemoveProduct(productToRemove: IMovie) {
    this.movieService.removeProductFromCart(productToRemove);
    this.checkPlural();
    this.emptyCart = this.movieService.checkCartEmpty();
  }

  calculateTotalProducts() {
    this.totalProducts = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalProducts += this.cart[i].price * this.orderRows[i].amount;
    }
  }
}
