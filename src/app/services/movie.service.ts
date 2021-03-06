import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject, throwError, Subscription } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { IMovie } from "../interfaces/IMovie";
import { IOrder } from "../interfaces/IOrder";
import { ICategory } from "../interfaces/ICategory";
import { IMovieService } from "../interfaces/IMovieService";

@Injectable({
  providedIn: "root"
})
export class MovieService implements IMovieService {
  searchResults = new Subject<IMovie[]>();

  constructor(private http: HttpClient) {}

  getMovieData(): Observable<IMovie[]> {
    const moviesUrl =
      "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

    return this.http.get<IMovie[]>(moviesUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getCategoryData(): Observable<ICategory[]> {
    const categoryUrl =
      "https://medieinstitutet-wie-products.azurewebsites.net/api/categories";

    return this.http.get<ICategory[]>(categoryUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getSearchResults(): Observable<IMovie[]> {
    return this.searchResults.asObservable();
  }

  searchMovies(searchText: string): Subscription {
    const searchUrl = `https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=${searchText}`;

    return this.http
      .get<IMovie[]>(searchUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
      .subscribe(results => this.searchResults.next(results));
  }

  sendOrder(order: IOrder): Observable<IOrder> {
    const orderUrl: string =
      "https://medieinstitutet-wie-products.azurewebsites.net/api/orders";

    return this.http.post<IOrder>(orderUrl, order).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getOrders(): Observable<IOrder[]> {
    const ordersUrl: string =
      "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=9";

    return this.http.get<IOrder[]>(ordersUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteOrder(id: number): Observable<IOrder[]> {
    const orderToDeleteUrl: string = `https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`;

    return this.http.delete<IOrder[]>(orderToDeleteUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occured:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(`There was an error, please try again later.`);
  }
}
