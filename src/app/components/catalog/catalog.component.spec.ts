import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MovieService } from "../../services/movie.service";
import { MockMovieService } from "../../services/mock-movie.service";

import { CatalogComponent } from "./catalog.component";
import { ProductComponent } from "../product/product.component";
import { ErrorComponent } from "../error/error.component";

describe("CatalogComponent", () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  let service: MockMovieService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [CatalogComponent, ProductComponent, ErrorComponent]
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

    service = TestBed.get(MockMovieService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("movies should have the length of 3", () => {
    expect(component.movies.length).toBe(3);
  });

  it("should display correct category", () => {
    const testMovieCategory = component.movies[1].productCategory[0].category;
    expect(testMovieCategory).toEqual("Sci-fi");
  });

  it("should return true if there are no search result", () => {
    service.searchMovies("abcd").subscribe(data => {
      component.checkIfSearchResults(data);
    });
    expect(component.noSearchResult).toBe(true);
  });

  it("should return false if there are a search result", () => {
    service.searchMovies("Dark").subscribe(data => {
      component.checkIfSearchResults(data);
    });
    expect(component.noSearchResult).toBe(false);
  });
});
