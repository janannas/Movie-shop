import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";

import { CatalogComponent } from "./components/catalog/catalog.component";
import { MoviePosterComponent } from "./components/movie-poster/movie-poster.component";
import { DetailsComponent } from "./components/details/details.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        AppComponent,
        CatalogComponent,
        MoviePosterComponent,
        DetailsComponent
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
