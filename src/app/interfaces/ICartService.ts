import { IMovie } from "./IMovie";
import { IOrderRows } from "./IOrderRows";
import { Subject, Observable } from "rxjs";
import { IProductMsg } from "./IProductMsg";

export interface ICartService {
  cart: IMovie[];
  orderRows: IOrderRows[];
  message?: Subject<any>;
  lastRemoved: Subject<boolean> | boolean;

  getProductsFromCart(): IMovie[];
  addProductToCart(myProduct: IMovie): void;
  createOrderRows(): IOrderRows[];
  increaseAmount(myProduct: IMovie): void;
  getProductMsg(): Observable<IProductMsg>;
  productMsg({
    productAmount,
    productName,
    productImage,
    productRejected
  }: {
    productAmount: number;
    productName: string;
    productImage: string;
    productRejected: boolean;
  }): void | Observable<IProductMsg>;
  updateAmount(amount: number, id: number): void;
  checkCartEmpty(): boolean;
  getLastRemoved(): Observable<boolean>;
  removeProductFromCart(productToRemove: IMovie): void;
}
