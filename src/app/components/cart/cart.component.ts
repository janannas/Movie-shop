import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { CartService } from "src/app/services/cart.service";
import { IMovie } from "src/app/interfaces/IMovie";
import { IBillingForm } from "src/app/interfaces/IBillingForm";
import { IOrderRows } from "src/app/interfaces/IOrderRows";
import { IOrder } from "src/app/interfaces/IOrder";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  cart: IMovie[];
  error: boolean = false;
  errorMsg: string;
  totalProducts: number = 49;
  plural: boolean = false;
  orderRows: IOrderRows[] = [];
  emptyCart: boolean;
  showOverview: boolean = false;

  constructor(
    private cartService: CartService,
    private movieService: MovieService
  ) {
    this.cart = this.cartService.getProductsFromCart();
    this.emptyCart = this.cartService.checkCartEmpty();
    this.orderRows = this.cartService.createOrderRows();
  }

  ngOnInit() {
    this.checkPlural();
    this.calculateTotalProducts();
  }

  handleUpdateAmount(amount: number, id: number) {
    this.cartService.updateAmount(amount, id);
    this.calculateTotalProducts();
  }

  createOrder(billingForm: IBillingForm): IOrder {
    return {
      companyId: 9,
      created: moment()
        .locale("sv")
        .format("YYYY-MM-DDTLTS"),
      createdBy: billingForm.email,
      paymentMethod: billingForm.paymentMethod,
      totalPrice: this.totalProducts,
      status: 0,
      orderRows: this.orderRows
    };
  }

  handleForm(billingForm: IBillingForm) {
    //Create the "real" order for the api, since the form presented in browser is "fake"
    const order = this.createOrder(billingForm);

    this.movieService.sendOrder(order).subscribe(
      response => console.log("success", response),
      error => {
        this.error = true;
        this.errorMsg = error;
        console.log("error", error);
      }
    );

    this.showOverview = true;

    this.cartService.resetCart();
  }

  checkPlural() {
    if (this.cart.length > 1) {
      this.plural = true;
    } else {
      this.plural = false;
    }
  }

  handleRemoveProduct(productToRemove: IMovie) {
    this.cartService.removeProductFromCart(productToRemove);
    this.checkPlural();
    this.emptyCart = this.cartService.checkCartEmpty();
  }

  calculateTotalProducts() {
    //Shipping-cost included from beginning
    this.totalProducts = 49;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalProducts += this.cart[i].price * this.orderRows[i].amount;
    }
  }
}
