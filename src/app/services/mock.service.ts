import { Injectable } from '@angular/core';
import { Observable, Subject, of } from "rxjs";

import { IMovie } from "../interfaces/IMovie";
import { IOrderRows } from "../interfaces/IOrderRows";
import { ICartService } from "../interfaces/ICartService";
import { IOrder } from "../interfaces/IOrder";
import { ICategory } from "../interfaces/ICategory";
import { IMovieService } from '../interfaces/IMovieService';

@Injectable({
  providedIn: 'root'
})
export class MockService implements ICartService, IMovieService {
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

  cart: IMovie[] = [];
  orderRows: IOrderRows[] = [];
  message = new Subject<any>();

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

  searchMovies(searchText: string) {
    if (this.movies[0].name.includes(searchText)) {
      return of([this.movies[0]]);
    }
    return of([]);
  }

  sendOrder(order: IOrder): Observable<IOrder> {
    return of(order);
  }

  getProductsFromCart(): IMovie[] {
    this.checkCartEmpty();
    return this.cart;
  }

  addProductToCart(myProduct: IMovie): void {
    let index = this.cart.findIndex(x => x.id === myProduct.id);

    if (index === -1) {
      this.cart.push(myProduct);
      this.productMsg({
        productAmount: 1,
        productName: myProduct.name,
        productRejected: false
      });
    } else {
      this.increaseAmount(myProduct);
    }
  }

  createOrderRows(): IOrderRows[] {
    for (let i = 0; i < this.cart.length; i++) {
      if (!this.orderRows[i]) {
        this.orderRows.push({ productId: this.cart[i].id, amount: 1 });
      }
    }
    return this.orderRows;
  }

  increaseAmount(myProduct: IMovie): void {
    this.createOrderRows();

    for (const rows of this.orderRows) {
      if (myProduct.id === rows.productId) {
        const max = rows.amount >= 9 ? true : false;

        if (!max) {
          ++rows.amount;
          this.productMsg({
            productAmount: rows.amount,
            productName: myProduct.name,
            productRejected: false
          });
        } else {
          this.productMsg({
            productAmount: rows.amount,
            productName: myProduct.name,
            productRejected: true
          });
        }
      }
    }
  }

  getProductMsg() {
    return this.productMsg({
      productAmount: 1,
      productName: "Interstellar",
      productRejected: false
    });
  }

  productMsg({
    productAmount,
    productName,
    productRejected
  }: {
    productAmount: number;
    productName: string;
    productRejected: boolean;
  }) {
    return of({
      productAmount,
      productName,
      productRejected
    })
  }

  updateAmount(amount: number, id: number): void {
    this.createOrderRows();

    for (const row of this.orderRows) {
      if (row.productId == id) {
        row.amount = +amount;
      }
    }
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
}
