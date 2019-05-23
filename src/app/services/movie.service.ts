import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, Subject, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { IMovie } from "../interfaces/IMovie";
import { IBillingForm } from "../interfaces/IBillingForm";
import { ICategory } from "../interfaces/ICategory";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  searchResults = new Subject<IMovie[]>();

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
