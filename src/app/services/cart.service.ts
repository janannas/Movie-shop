import { Injectable } from "@angular/core";
import { IMovie } from "../interfaces/IMovie";
import { IOrderRows } from "../interfaces/IOrderRows";
import { Subject } from "rxjs";
import { ICartService } from "../interfaces/ICartService";

@Injectable({
  providedIn: "root"
})
export class CartService implements ICartService {
  cart: IMovie[] = [];
  orderRows: IOrderRows[] = [];
  message = new Subject<any>();

  constructor() {}

  getProductsFromCart(): IMovie[] {
    this.checkCartEmpty();
    return this.cart;
  }

  addProductToCart(myProduct: IMovie): void {
    let index = this.cart.findIndex(x => x.id === myProduct.id);

    if (index === -1) {
      this.cart.push(myProduct);
      this.productMsg({
        productAmount: 1,
        productName: myProduct.name,
        productRejected: false
      });
    } else {
      this.increaseAmount(myProduct);
    }
  }

  createOrderRows(): IOrderRows[] {
    for (let i = 0; i < this.cart.length; i++) {
      if (!this.orderRows[i]) {
        this.orderRows.push({ productId: this.cart[i].id, amount: 1 });
      }
    }
    return this.orderRows;
  }

  increaseAmount(myProduct: IMovie): void {
    this.createOrderRows();

    for (const rows of this.orderRows) {
      if (myProduct.id === rows.productId) {
        const max = rows.amount >= 9 ? true : false;

        if (!max) {
          ++rows.amount;
          this.productMsg({
            productAmount: rows.amount,
            productName: myProduct.name,
            productRejected: false
          });
        } else {
          this.productMsg({
            productAmount: rows.amount,
            productName: myProduct.name,
            productRejected: true
          });
        }
      }
    }
  }

  getProductMsg() {
    return this.message.asObservable();
  }

  productMsg({
    productAmount,
    productName,
    productRejected
  }: {
    productAmount: number;
    productName: string;
    productRejected: boolean;
  }) {
    this.message.next({
      productAmount,
      productName,
      productRejected
    });
  }

  updateAmount(amount: number, id: number): void {
    for (const row of this.orderRows) {
      if (row.productId == id) {
        row.amount = +amount;
      }
    }
  }

  checkCartEmpty(): boolean {
    return this.cart.length === 0 ? true : false;
  }

  removeProductFromCart(productToRemove: IMovie): void {
    for (let i = 0; i < this.cart.length; i++) {
      if (productToRemove.id === this.cart[i].id) {
        this.cart.splice(i, 1) && this.orderRows.splice(i, 1);
      }
    }
  }
}
