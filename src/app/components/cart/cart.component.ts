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
  quantity = 1;
  orderRows: IOrderRows[] = [];
  cartEmpty: boolean;

  constructor(private movieService: MovieService) {
    this.cart = this.movieService.getProductsFromCart();
    this.cartEmpty = this.movieService.cartEmpty;
  }

  ngOnInit() {
    this.checkPlural();
    this.createOrderRows();
    this.calculateTotalProducts();
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
    this.calculateTotalProducts();
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
    } else {
      this.plural = false;
    }
  }

  removeProduct(productToRemove: IMovie) {
    for (let i = 0; i < this.cart.length; i++) {
      if (productToRemove.id === this.cart[i].id) {
        this.orderRows.splice(i, 1) && this.cart.splice(i, 1);

        if (this.orderRows.length <= 0) {
          this.cartEmpty = true;
        }
      }
      this.checkPlural();
    }
  }

  calculateTotalProducts() {
    this.totalProducts = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalProducts += this.cart[i].price * this.orderRows[i].amount;
    }
  }
}
