import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MovieService } from "../../services/movie.service";
import { MockMovieService } from "../../services/mock-movie.service";

import { CatalogComponent } from "./catalog.component";
import { ProductComponent } from "../product/product.component";
import { ErrorComponent } from "../error/error.component";
import { connect } from 'net';

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

  it("should connect correct category to movie", () => {
    const mockCategory = [
      {
        id: 7,
        name: "MockCategory"
      }
    ];
    const mockProduct = [
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

    component.movies = mockProduct;

    component.connectCategoriesToMovie(mockCategory);
    expect(mockProduct[0].productCategory[0].categoryId).toBe(7);
  })

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
