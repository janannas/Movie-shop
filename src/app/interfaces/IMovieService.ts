import { Observable } from "rxjs";
import { IMovie } from "./IMovie";
import { IBillingForm } from "./IBillingForm";
import { ICategory } from "./ICategory";
import { HttpErrorResponse } from "@angular/common/http";

export interface IMovieService {
  movies?: IMovie[];
  cart: IMovie[];
  categories?: ICategory[];

  getMovieData(): Observable<IMovie[]>;
  getCategoryData(): Observable<ICategory[]>;
  getSearchResults(): Observable<any>;
  searchMovies(searchText: string): Observable<IMovie[]>;
  addProductToCart(myProduct: IMovie): void;
  checkCartEmpty(): boolean;
  removeProductFromCart(productToRemove: IMovie): void;
  getProductsFromCart(): IMovie[];
  sendOrder(billingData: IBillingForm): Observable<IBillingForm>;
  handleError?(error: HttpErrorResponse): void;
}
