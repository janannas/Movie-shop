import { Injectable } from "@angular/core";
import { IMovie } from "../interfaces/IMovie";
import { IOrderRows } from "../interfaces/IOrderRows";
import { Subject, Observable } from "rxjs";
import { ICartService } from "../interfaces/ICartService";
import { IProductMsg } from "../interfaces/IProductMsg";

@Injectable({
  providedIn: "root"
})
export class CartService implements ICartService {
  cart: IMovie[] = [];
  orderRows: IOrderRows[] = [];
  //Content of pop-up message when buy button is clicked
  message = new Subject<IProductMsg>();
  //Used to trigger "cart-indicator/little dot on cart" in scss
  lastRemoved = new Subject<boolean>();

  getProductsFromCart(): IMovie[] {
    this.checkCartEmpty();
    return this.cart;
  }

  addProductToCart(myProduct: IMovie): void {
    this.lastRemoved.next(false);
    let index = this.cart.findIndex(x => x.id === myProduct.id);

    if (index === -1) {
      this.cart.push(myProduct);
      this.productMsg({
        productAmount: 1,
        productName: myProduct.name,
        productImage: myProduct.imageUrl
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

    for (const row of this.orderRows) {
      if (myProduct.id === row.productId) {
        const max = row.amount >= 9 ? true : false;

        if (!max) {
          ++row.amount;
          this.productMsg({
            productAmount: row.amount,
            productName: myProduct.name,
            productImage: myProduct.imageUrl
          });
        } else {
          this.productMsg({
            productRejected: true
          });
        }
      }
    }
  }

  getProductMsg(): Observable<IProductMsg> {
    return this.message.asObservable();
  }

  productMsg({
    productAmount = undefined,
    productName = undefined,
    productImage = undefined,
    productRejected = false
  }: {
    productAmount?: number;
    productName?: string;
    productImage?: string;
    productRejected?: boolean;
  }): void {
    this.message.next({
      productAmount,
      productName,
      productImage,
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

  getLastRemoved(): Observable<boolean> {
    return this.lastRemoved.asObservable();
  }

  removeProductFromCart(productToRemove: IMovie): void {
    for (let i = 0; i < this.cart.length; i++) {
      if (productToRemove.id === this.cart[i].id) {
        this.cart.splice(i, 1) && this.orderRows.splice(i, 1);

        this.checkCartEmpty() && this.lastRemoved.next(true);
      }
    }
  }

  resetCart(): void {
    this.cart = [];
    this.lastRemoved.next(true);
  }
}
