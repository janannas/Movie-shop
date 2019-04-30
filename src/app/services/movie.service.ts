import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { IMovie } from "../interfaces/IMovie";
import { IMovieService } from "../interfaces/IMovieService";
import { IBillingForm } from "../interfaces/IBillingForm";

@Injectable({
  providedIn: "root"
})
export class MovieService implements IMovieService {
  cart: IMovie[] = [];

  constructor(private http: HttpClient) {}

  getMovieData(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
      )
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addProductToCart(myProduct: IMovie): void {
    if (this.cart.includes(myProduct)) {
      return;
    } else {
      this.cart.push(myProduct);
    }
  }

  getProductsFromCart(): IMovie[] {
    return this.cart;
  }

  sendOrder(billingData: IBillingForm): Observable<IBillingForm> {
    const orderUrl: string =
      "https://medieinstitutet-wie-products.azurewebsites.net/api/orders";

    return this.http.post<IBillingForm>(orderUrl, billingData).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
