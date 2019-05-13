import { Observable } from "rxjs";
import { IMovie } from "./IMovie";
import { IBillingForm } from "./IBillingForm";
import { ICategory } from "./ICategory";

export interface IMovieService {
  getMovieData(): Observable<IMovie[]>;
  getCategoryData(): Observable<ICategory[]>;
  getSearchResults?(): Observable<any>;
  searchMovies?(searchText: string): void;
  addProductToCart(myProduct: IMovie): void;
  getProductsFromCart(): IMovie[];
  sendOrder(billingData: IBillingForm): Observable<IBillingForm>;
}
