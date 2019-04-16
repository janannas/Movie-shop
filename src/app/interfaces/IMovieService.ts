import { Observable } from "rxjs";
import { IMovie } from "./IMovie";

export interface IMovieService {
  getMovieData(): Observable<IMovie[]>;
}
