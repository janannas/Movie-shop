import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, Subscription } from "rxjs";
import { IMovie } from "./IMovie";
import { IOrder } from "./IOrder";
import { ICategory } from "./ICategory";

export interface IMovieService {
  movies?: IMovie[];
  categories?: ICategory[];
  searchResults?: Subject<IMovie[]>;

  getMovieData(): Observable<IMovie[]>;
  getCategoryData(): Observable<ICategory[]>;
  getSearchResults(): Observable<IMovie[]>;
  searchMovies(searchText: string): Subscription | Observable<IMovie[]>;
  sendOrder(billingData: IOrder): Observable<IOrder>;
  getOrders(): Observable<IOrder[]>;
  deleteOrder(id: number): Observable<IOrder[]>;
  handleError?(error: HttpErrorResponse): any;
}
