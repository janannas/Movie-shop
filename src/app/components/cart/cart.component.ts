import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { MovieService } from "src/app/services/movie.service";
import { IMovie } from "src/app/interfaces/IMovie";
import { IFakeForm } from "src/app/interfaces/IFakeForm";
import { IOrderRows } from "src/app/interfaces/IOrderRows";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cart: IMovie[];
  totalProducts: number = 0;
  plural: boolean = false;
  quantity = 1;
  orderRows: IOrderRows[] = [];

  constructor(private movieService: MovieService) {
    this.cart = this.movieService.getProductsFromCart();
  }

  ngOnInit() {
    this.checkPlural();

    this.createOrderRows();
  }

  createOrderRows() {
    for (let i = 0; i < this.cart.length; i++) {
      this.orderRows.push({ productId: this.cart[i].id, amount: 1 });
    }
  }

  updateQuantity(amount: number, id: number) {
    for (const row of this.orderRows) {
      if (row.productId == id) {
        row.amount = +amount;
      }
    }
  }

  getBillingObject(form: IFakeForm) {
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
    const finalForm = this.getBillingObject(fakeForm);
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
    }
  }

  calculateTotalProducts() {
    //TODO:
    this.totalProducts = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalProducts += this.cart[i].price *= this.orderRows[i].amount;
    }

    return this.totalProducts;
  }
}
