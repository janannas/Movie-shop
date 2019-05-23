import { IMovie } from "./IMovie";
import { IOrderRows } from "./IOrderRows";
import { Subject, Observable } from "rxjs";

export interface ICartService {
  cart: IMovie[];
  orderRows: IOrderRows[];
  message: Subject<any>;

  getProductsFromCart(): IMovie[];
  addProductToCart(myProduct: IMovie): void;
  createOrderRows(): IOrderRows[];
  increaseAmount(myProduct: IMovie): void;
  getProductMsg(): Observable<any>;
  updateAmount(amount: number, id: number): void;
  checkCartEmpty(): boolean;
  removeProductFromCart(productToRemove: IMovie): void;
}
