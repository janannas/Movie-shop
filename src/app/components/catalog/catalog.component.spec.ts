import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MovieService } from "../../services/movie.service";
import { CatalogComponent } from "./catalog.component";
import { ProductComponent } from "../product/product.component";
import { ErrorComponent } from "../error/error.component";
import { mockProducts } from "../../testing/mockProducts";
import { MockService } from "src/app/services/mock.service";

describe("CatalogComponent", () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  let service: MockService;

  let { mockProduct1 } = mockProducts;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [CatalogComponent, ProductComponent, ErrorComponent]
    })
      .overrideComponent(CatalogComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(MockService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("movies should have the length of 3", () => {
    expect(component.movies.length).toBe(3);
  });

  it("should connect correct category to movie", () => {
    const mockCategory = [
      {
        id: 7,
        name: "MockCategory"
      }
    ];

    component.movies = [mockProduct1];
    component.connectCategoryToMovie(mockCategory);

    expect(mockProduct1.productCategory[0].categoryId).toBe(7);
  });

  it("should have have been given correct category", () => {
    const testMovieCategory = component.movies[1].productCategory[0].category;
    expect(testMovieCategory).toEqual("Sci-fi");
  });

  it("should display correct category", () => {
    let link = fixture.nativeElement.querySelectorAll("li")[0];
    expect(link.innerHTML).toContain("Action");
  });

  it("should check if there are any search result", () => {
    service.searchMovies("abcd").subscribe(data => {
      component.checkIfSearchResults(data);
    });
    expect(component.noSearchResult).toBe(true);

    service.searchMovies("Dark").subscribe(data => {
      component.checkIfSearchResults(data);
    });
    expect(component.noSearchResult).toBe(false);
  });
});
