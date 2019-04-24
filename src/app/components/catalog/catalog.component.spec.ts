import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MovieService } from "../../services/movie.service";
import { MockMovieService } from "../../services/mock-movie.service";

import { CatalogComponent } from "./catalog.component";
import { ProductComponent } from "../product/product.component";

describe("CatalogComponent", () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [CatalogComponent, ProductComponent]
    })
      .overrideComponent(CatalogComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockMovieService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("movies should have the length of 3", () => {
    expect(component.movies.length).toBe(3);
  });
});
