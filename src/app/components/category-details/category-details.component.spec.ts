import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { ActivatedRouteStub } from "src/app/testing/activated-route-stub";

import { MovieService } from "../../services/movie.service";
import { CategoryDetailsComponent } from "./category-details.component";
import { ProductComponent } from "../product/product.component";
import { ErrorComponent } from "../error/error.component";
import { MockService } from "src/app/services/mock.service";

describe("CategoryDetailsComponent", () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let service: MockService;

  const activatedRoute = new ActivatedRouteStub({ id: "5" });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      declarations: [CategoryDetailsComponent, ProductComponent, ErrorComponent]
    })
      .overrideComponent(CategoryDetailsComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(MockService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should only contain movies with correct category", () => {
    expect(component.movies[0].productCategory[0].categoryId).toBe(5);
    expect(component.movies[0].name).toBe("The Dark Knight");

    component.searchCategories(6, service.movies);
    expect(component.movies[0].name).toBe("The Dark Knight");
  });
});
