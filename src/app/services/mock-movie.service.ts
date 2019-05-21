import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { IMovie } from "../interfaces/IMovie";
import { IMovieService } from "../interfaces/IMovieService";
import { IBillingForm } from "../interfaces/IBillingForm";
import { ICategory } from "../interfaces/ICategory";

@Injectable({
  providedIn: "root"
})
export class MockMovieService implements IMovieService {
  movies: IMovie[] = [
    {
      id: 76,
      name: "The Dark Knight",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice",
      price: 199,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
      year: 2008,
      added: "2016-01-05T00:00:00",
      productCategory: [
        {
          categoryId: 5,
          category: null
        },
        {
          categoryId: 6,
          category: null
        }
      ]
    },
    {
      id: 77,
      name: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      price: 129,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg",
      year: 2014,
      added: "2017-07-16T00:00:00",
      productCategory: [
        {
          categoryId: 8,
          category: null
        }
      ]
    },
    {
      id: 78,
      name: "Le fabuleux destin d'Amélie Poulain",
      description:
        "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
      price: 100,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
      year: 2001,
      added: "2017-07-10T00:00:00",
      productCategory: [
        {
          categoryId: 7,
          category: null
        }
      ]
    }
  ];
  cart: IMovie[] = [];
  categories: ICategory[] = [
    {
      id: 5,
      name: "Action"
    },
    {
      id: 6,
      name: "Thriller"
    },
    {
      id: 7,
      name: "Comedy"
    },
    {
      id: 8,
      name: "Sci-fi"
    }
  ];

  constructor() { }

  getMovieData(): Observable<IMovie[]> {
    return of(this.movies);
  }

  getCategoryData(): Observable<ICategory[]> {
    return of(this.categories);
  }

  getSearchResults(): Observable<IMovie[]> {
    return of([this.movies[1]]);
  }

  searchMovies(searchText: string): Observable<IMovie[]> {
    if (this.movies[0].name.includes(searchText)) {
      return of([this.movies[0]]);
    }
    return of([]);
  }

  addProductToCart(myProduct: IMovie): void {
    if (this.cart.length === 0) {
      this.cart.push(myProduct);

    } else {
      let index = this.cart.findIndex(x => x.id === myProduct.id);

      if (index === -1) {
        this.cart.push(myProduct);
      } else {
        console.log(`no`);
      }
    }
  }

  checkCartEmpty(): boolean {
    return this.cart.length === 0 ? true : false;
  }

  removeProductFromCart(productToRemove: IMovie): void {
    for (let i = 0; i < this.cart.length; i++) {
      if (productToRemove.id === this.cart[i].id) {
        this.cart.splice(i, 1);
      }
    }
  }

  getProductsFromCart(): IMovie[] {
    this.checkCartEmpty();
    return this.cart;
  }

  sendOrder(billingData: IBillingForm): Observable<IBillingForm> {
    return of(billingData);
  }
}
