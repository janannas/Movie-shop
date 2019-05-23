import { Observable } from "rxjs";
import { IMovie } from "./IMovie";
import { IOrder } from "./IOrder";
import { ICategory } from "./ICategory";
import { HttpErrorResponse } from "@angular/common/http";
import { IOrderRows } from "./IOrderRows";

export interface IMovieService {
  movies?: IMovie[];
  cart: IMovie[];
  categories?: ICategory[];
  orderRows: IOrderRows[];

  getMovieData(): Observable<IMovie[]>;
  getCategoryData(): Observable<ICategory[]>;
  getSearchResults(): Observable<any>;
  searchMovies(searchText: string): Observable<IMovie[]>;
  addProductToCart(myProduct: IMovie): void;
  addAmount(myProduct: IMovie): void;
  checkCartEmpty(): boolean;
  removeProductFromCart(productToRemove: IMovie): void;
  createOrderRows(): IOrderRows[];
  updateAmount(amount: number, id: number): void;
  getProductsFromCart(): IMovie[];
  sendOrder(billingData: IOrder): Observable<IOrder>;
  handleError?(error: HttpErrorResponse): void;
}
