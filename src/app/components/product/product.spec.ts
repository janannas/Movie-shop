import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MovieService } from "src/app/services/movie.service";
import { MockMovieService } from "src/app/services/mock-movie.service";

import { ProductComponent } from "./product.component";
import { Component } from "@angular/core";
import { IMovie } from "src/app/interfaces/IMovie";

describe("ProductComponent", () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ProductComponent, TestHostComponent]
    })
      .overrideComponent(ProductComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockMovieService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create", () => {
    expect(testHostComponent).toBeTruthy();
  });

  it("should get path for movie poster", () => {
    expect(
      testHostFixture.nativeElement.querySelector("img").getAttribute("src")
    ).toEqual(
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    );
  });

  it("should call addProductToCart", async(() => {
    spyOn(component.MovieService, "addProductToCart");

    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.MovieService.addProductToCart).toHaveBeenCalled();
    });
  }));

  it("should display correct category", () => {
    let link = testHostFixture.nativeElement
      .querySelectorAll("a")[1]
      .querySelector("p");

    expect(link.innerHTML).toContain("Action");
  });

  @Component({
    selector: `host-component`,
    template: `
      <app-product
        *ngFor="let movie of movies"
        [movie]="movie"
        [moviePoster]="movie.imageUrl"
        [categories]="movie.productCategory"
      ></app-product>
    `
  })
  class TestHostComponent {
    movies: IMovie[];
    category = { id: 5, name: "Action" };

    constructor(private service: MockMovieService) {
      this.service.getMovieData().subscribe(myMovieData => {
        this.movies = myMovieData;

        for (const movie of this.movies) {
          const firstMovie = movie.productCategory[0];
          if (firstMovie.categoryId === this.category.id) {
            firstMovie.category = this.category.name;
          }
        }
      });
    }
  }
});
