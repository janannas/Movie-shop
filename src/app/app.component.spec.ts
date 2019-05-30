import {
  TestBed,
  async,
  ComponentFixture,
  flush,
  tick,
  fakeAsync
} from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CatalogComponent } from "./components/catalog/catalog.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ErrorComponent } from "./components/error/error.component";
import { MockService } from "./services/mock.service";
import { MovieService } from "./services/movie.service";
import { CartService } from "./services/cart.service";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "catalog", component: CatalogComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        CatalogComponent,
        ProductComponent,
        ProductDetailsComponent,
        ErrorComponent
      ]
    })
      .overrideComponent(AppComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should start timer", () => {
    const testMsg = {
      productAmount: 1,
      productName: "Interstellar",
      productImage:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg",
      productRejected: false
    };

    spyOn(app, "startTimer");
    app.handleProductMsg(testMsg);
    fixture.whenStable().then(() => {
      expect(app.startTimer).toHaveBeenCalled();
    });
  });

  it("should reset to false", fakeAsync(() => {
    expect(app.productAdded).toBe(false);
    app.startTimer();
    expect(app.productAdded).toBe(true);
    flush();
    expect(app.productAdded).toBe(false);
  }));

  it("should start a new timer if timer is already set of", () => {
    app.startTimer();
    const firstTimer = app.timerId;
    expect(app.timerId).toBe(firstTimer);

    app.startTimer();
    const secondTimer = app.timerId;
    expect(app.timerId).not.toBe(firstTimer);

    app.startTimer();
    expect(app.timerId).not.toBe(firstTimer || secondTimer);
  });

  it("should not be able to queue timers", fakeAsync(() => {
    expect(app.isRunning).toBe(false);
    app.startTimer();
    expect(app.isRunning).toBe(true);
    //"stopping" at a point when half the time has passed until the timer is set of
    tick(1500);
    expect(app.isRunning).toBe(true);
    app.startTimer();
    expect(app.isRunning).toBe(true);
    flush();
    expect(app.isRunning).toBe(false);
  }));

  it("should not be able to search if input is empty", () => {
    app.handleSearch("");
    expect(app.emptySearch).toBe(true);
  });

  it("should close if search was successfull", () => {
    app.handleSearch("Dark");
    expect(app.isShowing).toBe(false);
  });
});
