import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { IMovie } from "./IMovie";
import { IOrder } from "./IOrder";
import { ICategory } from "./ICategory";

export interface IMovieService {
  movies?: IMovie[];
  categories?: ICategory[];
  searchResults?: Subject<IMovie[]>;

  getMovieData(): Observable<IMovie[]>;
  getCategoryData(): Observable<ICategory[]>;
  getSearchResults(): Observable<any>;
  searchMovies(searchText: string): Observable<IMovie[]>;
  sendOrder(billingData: IOrder): Observable<IOrder>;
  handleError?(error: HttpErrorResponse): any;
}
