import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject } from "rxjs";

import { catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { IMovie } from "../interfaces/IMovie";
import { IMovieService } from "../interfaces/IMovieService";
import { IBillingForm } from "../interfaces/IBillingForm";
import { ICategory } from "../interfaces/ICategory";
import { IOrderRows } from '../interfaces/IOrderRows';

@Injectable({
  providedIn: "root"
})
export class MovieService implements IMovieService {
  cart: IMovie[] = [];
  searchResults = new Subject<IMovie[]>();
  orderRows: IOrderRows[] = [];

  constructor(private http: HttpClient) { }

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

  getCategoryData(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/categories"
      )
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getSearchResults(): Observable<IMovie[]> {
    return this.searchResults.asObservable();
  }

  searchMovies(searchText: string): Observable<IMovie[]> {
    if (searchText === undefined || searchText === "") {
      return;
    } else {
      this.http
        .get<IMovie[]>(
          `https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=${searchText}`
        )
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
        .subscribe(results => this.searchResults.next(results));
    }
  }

  addProductToCart(myProduct: IMovie): void {
    let index = this.cart.findIndex(x => x.id === myProduct.id);

    if (index === -1) {
      this.cart.push(myProduct);
    } else {
      this.createOrderRows();
      for (const rows of this.orderRows) {
        if (myProduct.id === rows.productId) {
          const max = this.checkMaximumAmount(rows.amount);

          if (!max) {
            ++rows.amount;
          }
        }
      }
    }
  }

  checkMaximumAmount(amount: number): boolean {
    return amount >= 9 ? true : false;
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

  createOrderRows(): IOrderRows[] {
    for (let i = 0; i < this.cart.length; i++) {
      this.orderRows.push({ productId: this.cart[i].id, amount: 1 });
    }
    return this.orderRows;
  }

  updateAmount(amount: number, id: number): void {
    for (const row of this.orderRows) {
      if (row.productId == id) {
        row.amount = +amount;
      }
    }
  }

  getProductsFromCart(): IMovie[] {
    this.checkCartEmpty();
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
