import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-movie-poster",
  templateUrl: "./movie-poster.component.html",
  styleUrls: ["./movie-poster.component.css"]
})
export class MoviePosterComponent implements OnInit {
  @Input() moviePoster: string;
  @Input() movieId: number;
  constructor() {}

  ngOnInit() {}
}
