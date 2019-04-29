import { Observable } from "rxjs";
import { IMovie } from "./IMovie";
import { IBillingForm } from "./IBillingForm";

export interface IMovieService {
  getMovieData(): Observable<IMovie[]>;
  addProductToCart(myProduct: IMovie): void;
  getProductsFromCart(): IMovie[];
  sendOrder(billingData: IBillingForm): Observable<IBillingForm>;
}
