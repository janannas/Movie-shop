import { Component, OnInit, Input } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  @Input() errorMsg: string;
  constructor() {}

  ngOnInit() {}
}
