import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { ActivatedRouteStub } from "src/app/testing/activated-route-stub";

import { MovieService } from "../../services/movie.service";

import { ProductDetailsComponent } from "./product-details.component";
import { ErrorComponent } from "../error/error.component";
import { MockService } from "src/app/services/mock.service";

describe("ProductDetailsComponent", () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const activatedRoute = new ActivatedRouteStub({ id: "76" });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      declarations: [ProductDetailsComponent, ErrorComponent]
    })
      .overrideComponent(ProductDetailsComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("movies should have the length of 3", () => {
    expect(component.movies.length).toBe(3);
  });

  it("searchMovies should return the the correct id", () => {
    component.searchMovies(77);
    expect(component.movie.id).toBe(77);
  });

  it("addProductToCart should have been called", () => {
    spyOn(component.cartService, "addProductToCart");

    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.cartService.addProductToCart).toHaveBeenCalled();
    });
  });
});
