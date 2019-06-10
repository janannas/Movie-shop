import { Component } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";
import { IOrder } from "src/app/interfaces/IOrder";
import { empty } from "rxjs";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent {
  orders: IOrder[];
  success: boolean;
  errorMsg: string;
  error: boolean;

  constructor(private movieService: MovieService) {
    this.movieService.getOrders().subscribe(
      myOrders => {
        this.orders = myOrders;
      },
      error => {
        this.error = true;
        this.errorMsg = error;
        console.log("Error: " + error);
      }
    );
  }

  handleRemoveOrder(orderToRemove: IOrder) {
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
      if (orderToRemove.id === order.id) {
        this.removeOrder(order.id);

        this.spliceOrder(i);
      }
    }
  }

  removeOrder(id: number) {
    this.movieService
      .deleteOrder(id)
      .subscribe(
        response => (response ? (this.success = true) : empty()),
        error => console.log("error", error)
      );
  }

  spliceOrder(index: number) {
    this.orders.splice(index, 1);
  }
}
