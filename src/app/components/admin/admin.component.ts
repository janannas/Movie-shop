import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";
import { IOrder } from "src/app/interfaces/IOrder";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  orders: IOrder[];
  success: boolean;

  constructor(private movieService: MovieService) {
    this.movieService.getOrders().subscribe(myOrders => {
      this.orders = myOrders;
    });
  }

  removeOrder(orderToRemove: IOrder) {
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
      if (orderToRemove.id === order.id) {
        this.movieService.deleteOrder(order.id).subscribe(
          response => {
            this.success = true;
            console.log("success", response);
          },
          error => console.log("error", error)
        );
      }
    }
  }

  refresh() {
    location.reload();
  }

  ngOnInit() {}
}
